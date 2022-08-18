import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, limit, onSnapshot, query, serverTimestamp, setDoc, startAfter, updateDoc, where } from "firebase/firestore";
import { db } from "../Firebase"
import { useAuth } from '../context/AuthContext';
import Pagination from './pagination';
const TodoList = () => {
  const [todoText, setTodoText] = useState("")
  const [todoFilter, setTodoFilter] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [docId, setdocId] = useState('')
  const [todos, setTodos] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTodos, settotalTodos] = useState(0)
  const { currentUser } = useAuth()
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost);
  // console.log("currentPosts", currentPosts)
  console.log("totalTodos", totalTodos)
  // Change page
  const paginate = async pageNumber => {
    setCurrentPage(pageNumber)
    console.log('currentPage * postsPerPage', currentPage * postsPerPage)
    
    // const first = query(collection(db, "todos"), startAfter(currentPage * postsPerPage), limit(postsPerPage));

    
    // console.log("todoRef", first)
  };

  const addTodo = async () => {
    if (isEdit) {
      const washingtonRef = doc(db, "todos", docId);

      await updateDoc(washingtonRef, {
        title: todoText
      });
      alert("todo updated")
      setIsEdit(false)
    } else {
      const todosCollection = collection(db, "todos");
      const data = await setDoc(doc(todosCollection), {
        title: todoText,
        timeStamp: serverTimestamp(),
        userId: currentUser?.uid
      })
      alert("todo saved")
    }
    setTodoText("")
  }

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
    alert("Todo deleted")
  }

  const editTodo = async (id, value) => {
    setdocId(id)
    setTodoText(value)
    setIsEdit(true)
  }


  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "todos"),
      (docSnap) => {
        let arr = []
        if (docSnap.docs) {
          settotalTodos(docSnap.docs.length)
          docSnap.docs.forEach((data) => {
            arr.push({ data: data.data(), id: data.id })
          })
          setTodos(arr)
        }
      })
    return () => unsub
  }, [])

  return (
    <div className="container mx-auto px-4">
      <div className="flex shadow bg-white p-2 mb-2">
        <input onChange={(e) => setTodoFilter(e.target.value)} id="search-input" className="w-full rounded text-gray-700 p-2" type="text" placeholder="Search any ..." maxLength={"50"} required />
      </div>
      <div className="flex shadow bg-white p-2 mb-2">
        <input value={todoText} onChange={(e) => setTodoText(e.target.value)} id="todo-input" className="w-full rounded text-gray-700 p-2" type="text" placeholder="Title..." maxLength={"50"} required />
        <div className="bg-green-500 hover:bg-green-400 rounded text-white p-2 pl-5 pr-5 cursor-pointer">
          <button onClick={addTodo} className="font-semibold text-teal-100 text-sm cursor-pointer">{isEdit ? 'Update' : 'Add'}</button>
        </div>
      </div>
      <div id="todo-list" className='space-y-2 '>
        {currentPosts?.map((todo) => (
          <div key={todo?.id} className="todo-container text-gray-700 text-center ">
            <div className="flex items-center justify-between bg-yellow-100 shadow  px-4">
              <span className="w-full  text-left leading-loose p-2 pl-10 cursor-pointer">{todo?.data?.title}</span>
              {currentUser.uid === todo.data.userId && <div className='flex items-center space-x-3'>
                <i onClick={() => editTodo(todo.id, todo?.data?.title)} className="fa-solid text-2xl fa-pen text-green-400 cursor-pointer"></i>
                <i onClick={() => deleteTodo(todo.id)} className="fa-solid text-2xl fa-circle-minus text-red-400 cursor-pointer"></i>
              </div>}
            </div>
            <div className="close-btn p-2 pr-8 text-xl cursor-pointer"></div>
          </div>
        ))}
      </div>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={todos.length}
        paginate={paginate}
      />
    </div>
  )
}

export default TodoList