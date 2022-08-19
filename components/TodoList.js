import React, { useEffect, useState } from 'react'
import {
  collection, deleteDoc, doc, orderBy, startAfter, endBefore, limitToLast,
  limit, onSnapshot, query, serverTimestamp, getDocs,
  updateDoc, addDoc
} from "firebase/firestore";
import { db } from "../Firebase"
import moment from "moment"
import { ToastContainer, toast } from "react-toastify"
import { useAuth } from '../context/AuthContext';
import Pagination from './pagination';
const TodoList = () => {
  const [loading, setLoading] = useState(true)
  const [todoText, setTodoText] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [isBack, setIsBack] = useState(false)
  const [docId, setdocId] = useState('')
  const [todos, setTodos] = useState([])
  const [lastVisibleRecord, setLastVisibleRecord] = useState([])
  const { currentUser, search } = useAuth()
  const collectionRef = collection(db, "todos")


  const addTodo = async () => {

    if (isEdit) {
      const updateDocRef = doc(collectionRef, docId);
      await updateDoc(updateDocRef, {
        title: todoText
      });
      toast.success("Todo successfully Updated")
      setIsEdit(false)
    } else {
      await addDoc(collectionRef, {
        title: todoText,
        timeStamp: serverTimestamp(),
        userId: currentUser?.uid
      })
      toast.success("Todo successfully created")
    }
    setTodoText("")
  }

  const deleteTodo = async (id) => {
    toast.success("Todo successfully Deleted")
    await deleteDoc(doc(collectionRef, id));
  }

  const editTodo = async (id, value) => {
    setdocId(id)
    setTodoText(value)
    setIsEdit(true)
  }
  const backward = async () => {
    setLoading(true)
    const lastDoc = todos[4]
    const documentSnapshots = await getDocs(collectionRef)
    const findLastDoc = documentSnapshots.docs.find((doc) => doc?.id === lastDoc?.id)
    setLastVisibleRecord(findLastDoc)
    setIsBack(true);
  }
  const forward = async () => {
    setLoading(true)
    const lastDoc = todos[4]
    const documentSnapshots = await getDocs(collectionRef)
    const findLastDoc = documentSnapshots.docs.find((doc) => doc.id === lastDoc.id)
    setLastVisibleRecord(findLastDoc)
    setIsBack(false);
  }

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collectionRef,
        orderBy("timeStamp", "desc"),
        isBack ? endBefore(lastVisibleRecord) : 
        startAfter(lastVisibleRecord),
        limit(5)
      ),
      (docSnap) => {
        let arr = []
        if (docSnap.docs) {
          const filteredTodos = docSnap.docs.filter((doc) => {
            const todosDoc = doc.data()
            return todosDoc.title.toLowerCase().includes(search.toLowerCase())
          })
          filteredTodos.forEach((data) => {
            arr.push({ ...data.data(), id: data.id })
          })
          setTodos(arr)
          setLoading(false)
        }
      })

    return () => unsub
  }, [search, lastVisibleRecord])
  return (
    <>
      <div className="flex items-center">
        <div className="container mx-auto max-w-sm bg-[#215Bf0] shadow-lg rounded-lg py-6 md:max-w-xl lg:max-w-xl">
          <h1 className="text-center text-white mb-3">Welcome to Todos!</h1>
          <div className="mx-6  space-y-3">
            <div className='flex items-center justify-between'>
              <input value={todoText} onChange={(e) => setTodoText(e.target.value)} type="text" placeholder="what's up?" className="w-full placeholder:text-white bg-transparent py-2 border-b border-white text-white mb-3 focus:outline-none" />
              <button onClick={addTodo} className='bg-white h-[40px] w-[40px] p-1 rounded-md flex items-center justify-center'> <i className={`${isEdit ? 'fa-solid fa-circle-check bg-white text-[#215Bf0] ' : 'fa-light fa-plus'} text-[#215Bf0] text-3xl`}></i></button>
            </div>
            <ol className="text-white space-y-3 overflow-y-auto">
              {loading ?
                <div class="w-10 p-4 h-10 rounded-full animate-spin
                     border-x-4 border-solid border-white border-t-transparent"></div> :
                todos.map((todo) => (
                  <>
                    <li className="flex justify-between" key={todo.id}>
                      <div className="">
                        <p className='text-lg p-0'>{todo?.title}</p>
                        <small className='text-[10px]  font-bold block'>{moment(todo?.timeStamp?.seconds * 1000).fromNow()}</small>
                      </div>
                      <div className="space-x-1">
                        <button onClick={() => editTodo(todo.id, todo?.title)}
                          className="w-7 h-7 bg-green-500 rounded-full text-xs" >
                          <i className="fas fa-edit fa-sm"></i>
                        </button>
                        <button onClick={() => deleteTodo(todo.id)} className="w-7 h-7 bg-red-500 rounded-full text-xs" >
                          <i className="fas fa-times fa-sm"></i>
                        </button>
                      </div>
                    </li>
                    <hr />
                  </>
                ))
              }
            </ol>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Pagination
        backward={backward}
        lastVisibleRecord={lastVisibleRecord}
        forward={forward}
      />
    </>

  )
}

export default TodoList