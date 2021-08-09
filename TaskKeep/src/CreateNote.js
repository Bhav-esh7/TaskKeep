import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import ap from './firebase';
import { useAuth } from './context/AuthContext'
import AddIcon from '@material-ui/icons/Add';

const shadow = {
    padding: "15px 10px 5px 10px",
    boxShadow: "3px 5px 15px -5px",
    borderRadius: "10px",
    position: "relative"
}

const CreateNote = (props) => {

    const [expand,setExpand] = useState(false);
    const { currentUser } = useAuth()
    const [note,setNote] = useState({
        title : "",
        content : "",
    });

    const InputEvent = (event) => {

        const value = event.target.value; 
        const name = event.target.name;

        setNote((prevData) => {
            return {
                ...prevData,
                [name] : value,
            };
        });
    };

    const addEvent =(e) => {
        e.preventDefault();

        const db = ap.firestore();

        db.collection('todos').add({
            note : note.content,
            title : note.title,
            userid : currentUser.uid
        })

        props.passNote(note);
        setNote (() => {
            return({
            title : "",
            content : "",
        })
        });
    };

    const expandit = () => {
        setExpand(true);
    }

    const backtonormal =() => {
        setExpand(false);
    }

    return (
        <>
        <div className = "main_note" onDoubleClick={backtonormal}>
            <form style = {{minHeight : "50px" , ...shadow}}>
            {expand ?
                <input className ="input1"  type = "text" value ={note.title} name = "title" onChange = {InputEvent} placeholder="Title" autoComplete="off" /> : null }
                <textarea rows="" column="" value={note.content} name="content" onChange ={InputEvent} placeholder = "Take a Note..." onClick = {expandit} ></textarea>
            {expand ? <Button onClick={addEvent} variant="contained" color="default" >
                    <AddIcon className = "plus_sign" />
                </Button>: null}
            </form>
        </div>
        </>
    )
}

export default CreateNote;
