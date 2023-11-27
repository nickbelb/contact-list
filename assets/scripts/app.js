'use strict';

import { Contact } from "./Contact.js";
import * as utils from "./utility.js";

const contactDetails = utils.selectObject('.contact-details');
const addBtn = utils.selectObject('.create-contact-button');
const contactListBox = utils.selectObject('.contact-list-box');
const confirmationBox =utils.selectObject('.confirmation-box');
const messagBox = utils.selectObject('.message');
const main = utils.selectObject('.main');
const yesBtn= utils.selectObject('.yes-option');
const noBtn= utils.selectObject('.no-option');
let indexObjt;
let contactList=[];
let contactListDivs=[];
let contactInfo=[];

function validateContactInfo(){
    contactInfo = (contactDetails.value).split(',');
    if(contactInfo.length == 3){
        let validationRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(validationRegex.test(contactInfo[2])){
            return true;
        }
    }
    return false;
}

function makeInvisible(){
    confirmationBox.classList.remove('visible');
    confirmationBox.classList.add('hidden');
    main.classList.remove('opacity-visible');
 
}

function makeVisible(index){
    confirmationBox.classList.remove('hidden');
    confirmationBox.classList.add('visible')
    main.classList.add('opacity-visible');
    indexObjt = index;
}

function deleteObj(index) {
    makeInvisible();
    contactListDivs.splice(index,1);
    contactList.splice(index,1);
    showListDivs();
}

function showListDivs(){
    contactListBox.innerHTML="";
    contactListDivs.forEach(element => {
        contactListBox.appendChild(element);
    });
}

function createContactDiv(contact){
    const contactBox = document.createElement('div');
    const contactData = document.createElement('p');
    const deleteBtn = document.createElement('i');
    let message = `Name: ${contact.name}\n City: ${contact.city}\n Email: ${contact.email}`;
    contactData.innerText = message;
    deleteBtn.onclick = function(){makeVisible(contactList.indexOf(contact))};
    utils.addClassToItems(contactBox,'contact-details');
    utils.addClassToItems(deleteBtn,'fa-solid','fa-trash-can');
    utils.addChildToElement(contactBox,contactData,deleteBtn);
    utils.addChildToElement(contactListBox,contactBox);
    contactListDivs.push(contactBox);
}

function createContact(){
    let validate = validateContactInfo();
    if (validate){
        let contact = new Contact(contactInfo[0],contactInfo[2],contactInfo[1]);
        contactList.push(contact);
        createContactDiv(contact);
    }else{
        let message = `Incorrect format(must be name,city,email) or incorrect email format`;
        messagBox.textContent = message;
    }
}

utils.onEvent('click',addBtn,createContact);
utils.onEvent('click',noBtn,function() {makeInvisible()});
utils.onEvent('click',yesBtn,function() {deleteObj(indexObjt) });


