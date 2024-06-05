import { NextResponse } from "next/server";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

/**
 * Email Validation feature
 * @param passwordFieldValue the email to validate
 * @returns the boolean status of the validation
 */
export function isValidEmail(emailFieldValue) {
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (regex.test(emailFieldValue));    
};

/**
 * Password Validation feature
 * @param passwordFieldValue the password to validate
 * @returns the boolean status of the validation
 */
export function isValidPassword(passwordFieldValue) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.\[\]()\\^$|?*+!@#<>])[A-Za-z\d.\[\]()\\^$|?*+!@#<>]{8,}$/;
  return (regex.test(passwordFieldValue));    
};

/**
 * 
 * @param _body The body value
 * @param _status The response status code (ie 401 for Unauthorized)
 * @param _statusText The response Text associated with the status
 * @returns the built Nextresponse
 */
export function buildResponse(_body: BodyInit, _status: number, _statusText: string){
  const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", "application/json");
    const response = new NextResponse(_body,
      {
        status: _status,
        statusText: _statusText,
        headers: responseHeaders,
      });
    return response;
}

/**
 * set Password Visibility on CLient side for SignIN and SignUp
 * @param passwordInputRef the React Reference of the password input HTML Element 
 */
export function setPasswordVisibility(passwordInputRef: MutableRefObject<any>, eyeElement : HTMLInputElement, slashElement : HTMLInputElement) {
  const passwordInputElement = passwordInputRef.current;
  //here cannot use Useref as the element could be not displayed in the DOM
  var eyeIconElement = eyeElement;
  var eyeSlashIconElement = slashElement;

  if (passwordInputElement.type === "password") {
    passwordInputElement.type = "text";
    eyeIconElement.classList.add('hidden');
    eyeSlashIconElement.classList.remove('hidden');
  } else {
    passwordInputElement.type = "password";
    eyeIconElement.classList.remove('hidden');
    eyeSlashIconElement.classList.add('hidden');
  }
};

/*
export function setPasswordVisibility(passwordInputRef: MutableRefObject<any>) {
  const passwordInputElement = passwordInputRef.current;
  //here cannot use Useref as the element could be not displayed in the DOM
  var eyeIconElement = document.getElementById("eye-icon") as HTMLInputElement;
  var eyeSlashIconElement = document.getElementById("eye-sla
  h-icon") as HTMLInputElement;

  if (passwordInputElement.type === "password") {
    passwordInputElement.type = "text";
    eyeIconElement.classList.add('hidden');
    eyeSlashIconElement.classList.remove('hidden');
  } else {
    passwordInputElement.type = "password";
    eyeIconElement.classList.remove('hidden');
    eyeSlashIconElement.classList.add('hidden');
  }
};

*/