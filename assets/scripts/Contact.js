'use strict';

export class Contact {
    #name;
    #email;
    #city;

    constructor(name,email,city){
        this.#name=name;
        this.#city=city;
        this.#email=email;
    }

    get name(){
        return this.#name;
    }

    get email(){
        return this.#email;
    }

    get city(){
        return this.#city;
    }
}