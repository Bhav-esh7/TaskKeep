import React , { useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import CreateNote from './CreateNote';
import ap from './firebase';
import { useAuth } from './context/AuthContext';
import './App.css';
import Note from './Note';
import { useEffect } from 'react';

const BaseComp = () => {

    const [addItem,setAddItem] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
      const items = [];
      const db = ap.firestore();
      db.collection("todos").get().then((todos) => {
        // eslint-disable-next-line array-callback-return
        todos.docs.map((todo) => {
          if(todo.data().userid === currentUser.uid){
            items.push({
              content: todo.data().note,
              title: todo.data().title
            })
          }
        })
        setAddItem(items);
      })
    }, [currentUser.uid])

    //adding items in array
    const addNote = (note) => {

        //alert("I am clicked");
        setAddItem((prevData)=>{
        return [...prevData , note];
        });
    
    };

  const onDelete =(id) => {
    setAddItem((oldData)=> {
    return (oldData.filter((currdata,indx) => {
      return indx !== id;
    }))
  })    
  }

    return (
        <>
          {/* <div className = "main_div"> */}
            <Header />
            <CreateNote passNote={addNote} />
            {/*using map method to render array item one by one*/}
            {addItem.map((val,index)=> {
                return (
                <Note 
                key = {index}
                id = {index}
                title = {val.title}
                content = {val.content}
                deleteItem = {onDelete}
                />
                );
            })}
            <Footer />
          {/* </div> */}
        </>
    )
}

export default BaseComp
