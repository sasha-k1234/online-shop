import React, { useState } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { AddRandomContact } from "../AddRandomContact/AddRandomContact";
import { DeleteAllContacts } from "../DeleteAllContacts/DeleteAllContacts";
import { AddContact } from "../AddContact/AddContact";
import { FavouriteContact } from "../FavoriteContact/FavoriteContact";
import { GeneralContacts } from "../GeneralContacts/GeneralContacts";
import { useDispatch, useSelector } from "react-redux";
import { deleting } from "../../Store/AddDelReducer";
export function ContactIndex() {
  // const dispatch = useDispatch();
  // const [contacts, setContacts] = useState([
  //   {
  //     id: 1,
  //     name: "Taras Shevchenko",
  //     email: "Taras@gmail.com",
  //     phone: "095038432432",
  //     isFavorite: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Grugoriy Oliynuk",
  //     email: "Grisha@gmail.com",
  //     phone: "095038434565",
  //     isFavorite: false,
  //   },
  //   {
  //     id: 3,
  //     name: "Mykhailo Grugorovuch",
  //     email: "Misha@gmail.com",
  //     phone: "09503843908",
  //     isFavorite: false,
  //   },
  // ]);
  const contacts = useSelector(state=>state.addDel.contacts)
  const [editContact, setEditContact] = useState(null);
  // const createContact = (contact) => {
  //   const newContact = {
  //     id: contacts.length + 1,
  //     ...contact,
  //     isFavorite: false,
  //   };
   // setContacts([...contacts, newContact]);
  //};

  const toggleFavorite = (id) => {
    //contacts.map(obj=>obj.id==id?isFavorite==!isFavorite:isFavorite);
    const updateContacts = contacts.map((obj) => {
      if (obj.id == id) {
        obj.isFavorite = !obj.isFavorite;
      }
      return obj;
    });
   // setContacts(updateContacts);
  };

  // const handleDelete = (id) => {
  //  // setContacts(contacts.filter((obj) => obj.id !== id));
  //     dispatch(deleting(id))
  // };

  // const deleteContacts = () => {
  //   //setContacts([]);
  // };

  const handleEditing = (id) => {
    //setEditContact(contacts.find((obj) => obj.id === id));
  };

  // const update = ()=>{
  //  // setContacts([...contacts]);
  //   // setEditContact(null);

  // }

  return (
    <div className="text-center" style={{ minHeight: "85vh" }}>
      <Header></Header>
      <div className="row py-3">
        <div className="col-4 offset-2">
          <AddRandomContact ></AddRandomContact>
        </div>
        <div className="col-4">
          <DeleteAllContacts
            // deleteContacts={deleteContacts}
          ></DeleteAllContacts>
        </div>
        <div className="row">
          <AddContact
           
            editContact={editContact}
            // update={update}
          ></AddContact>
        </div>
        <div className="row">
          <FavouriteContact
           // handleDelete={handleDelete}
            toggleFavorite={toggleFavorite}
            contacts={contacts.filter((obj) => obj.isFavorite)}
            // handleEditing={handleEditing}
          ></FavouriteContact>
        </div>
        <div className="row">
          <GeneralContacts
            //handleDelete={handleDelete}
            toggleFavorite={toggleFavorite}
            contacts={contacts.filter((obj) => !obj.isFavorite)}
            // handleEditing={handleEditing}
          ></GeneralContacts>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
