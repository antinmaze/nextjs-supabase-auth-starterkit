'use client';

import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import EyeFill from '../../icons/EyeFill';
import EyeSlashFill from '../../icons/EyeSlashFill';
import { setPasswordVisibility } from "@/utils/auth/factory";
import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";

const SignUpForm = () => {
  const router = useRouter();

  const [registerMessage, setRegisterMessage] = useState('');
  const [googleMessage, setGoogleMessage] = useState('');
  
  const googleMessageRef = useRef<HTMLDivElement | null>(null);
  const registerMessageRef = useRef<HTMLDivElement | null>(null);

  const [isTermsChecked, setIsTermsChecked] = useState(false);

  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // loading state
  const TARGET_SUCCESS_PAGE = '/welcome';

  useEffect(() => {
    const checkbox = document.getElementById('consentSignUp') as HTMLInputElement;
    if (checkbox && checkbox.checked) {
      setIsTermsChecked(true);
    }
  }, []);
  
  const googleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //clean previous message
    setGoogleMessage('');
    setRegisterMessage('');
    //here no signed up needed anymore
    if (hasSignedUp) return;

    //Checking Agree with Terms, Conditions and Policy
    if (!isTermsChecked) {
      setGoogleMessage('Please agree with the Terms and the Privacy' +
        ' Policy by checking the consent checkbox.');
      return;
    }

    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }

  const registerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //clean previous message
    setGoogleMessage('');
    setRegisterMessage('');
    //here no signed up needed anymore
    if (hasSignedUp) return;

    //Checking Agree with Terms, Conditions and Policy
    if (!isTermsChecked) {
      setRegisterMessage('Please agree with the Terms and the Privacy' +
        ' Policy by checking the consent checkbox.');
      return;
    }

    const formData = new FormData(event.currentTarget);
    const data = new FormData();
    const inputEmail = formData.get('email') as string;
    const inputPassword = formData.get('password') as string;

    //Check email or password are empty
    if (inputEmail.length === 0 || inputPassword.length === 0) {
      setRegisterMessage('Please complete all the requested information.');
      return;
    }

    setIsLoading(true); // set load status to true

    try {
      data.set('email', inputEmail);
      data.set('password', inputPassword);
      const response = await fetch('/api/auth/signup/', {
        method: 'POST',
        body: data,
      });

      if (response.status >= 300) {
        setRegisterMessage(response.statusText);
        registerMessageRef.current?.classList.remove('text-primary');
        registerMessageRef.current?.classList.add('text-red-400');
      } else { //Successful connection
        setHasSignedUp(true);
        const json = await response.json();
        const welcomeMessage = json.message;
        setRegisterMessage(welcomeMessage);
        registerMessageRef.current?.classList.remove('text-red-400');
        registerMessageRef.current?.classList.add('text-primary');
        router.push(TARGET_SUCCESS_PAGE);
      }
    } catch (error) {
      setRegisterMessage('An error has occurred. Please try again later.');
      registerMessageRef.current?.classList.remove('text-primary');
      registerMessageRef.current?.classList.add('text-red-400');
    } finally {
      setIsLoading(false); // définir l'état de chargement à false
    }
  };

  const passwordInputRef = useRef(null);
  const handlePasswordVisibility = () => {
    var eyeIconElement = document.getElementById("eye-icon") as HTMLInputElement;
    var eyeSlashIconElement = document.getElementById("eye-slash-icon") as HTMLInputElement;
    setPasswordVisibility(passwordInputRef, eyeIconElement, eyeSlashIconElement);
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-4 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Create your account
                </h3>

                <div className="mb-8 flex">
                    <label
                      htmlFor="checkboxLabel"
                      className="flex cursor-pointer select-none text-sm font-medium text-body-color"
                    >
                      <div className="relative">
                        <div className="box mr-4 mt-1 flex h-6 w-6 items-center justify-center rounded border border-body-color border-opacity-20 dark:border-white dark:border-opacity-10">
                          <span>
                            <input
                              id="consentSignUp"
                              name="consentSignUp"
                              type="checkbox"
                              onChange={() => setIsTermsChecked(!isTermsChecked)}
                              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded
                             focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 
                             focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                          </span>
                        </div>
                      </div>
                      <span>
                        By creating account means you agree to the
                        <a href="/terms-of-service/" className="text-primary hover:underline">
                          {" "}
                          Terms and Conditions{" "}
                        </a>
                        , and consent to our
                        <a href="/privacy-policy/" className="text-primary hover:underline">
                          {" "}
                          Privacy Policy{" "}
                        </a>
                      </span>
                    </label>
                  </div>

                <form onSubmit={googleSubmit}>
                  <button className="border-stroke dark:text-body-color-dark dark:shadow-two mb-4 flex w-full items-center justify-center rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none">
                    <span className="mr-3">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_95:967)">
                          <path
                            d="M20.0001 10.2216C20.0122 9.53416 19.9397 8.84776 19.7844 8.17725H10.2042V11.8883H15.8277C15.7211 12.539 15.4814 13.1618 15.1229 13.7194C14.7644 14.2769 14.2946 14.7577 13.7416 15.1327L13.722 15.257L16.7512 17.5567L16.961 17.5772C18.8883 15.8328 19.9997 13.266 19.9997 10.2216"
                            fill="#4285F4"
                          />
                          <path
                            d="M10.2042 20.0001C12.9592 20.0001 15.2721 19.1111 16.9616 17.5778L13.7416 15.1332C12.88 15.7223 11.7235 16.1334 10.2042 16.1334C8.91385 16.126 7.65863 15.7206 6.61663 14.9747C5.57464 14.2287 4.79879 13.1802 4.39915 11.9778L4.27957 11.9878L1.12973 14.3766L1.08856 14.4888C1.93689 16.1457 3.23879 17.5387 4.84869 18.512C6.45859 19.4852 8.31301 20.0005 10.2046 20.0001"
                            fill="#34A853"
                          />
                          <path
                            d="M4.39911 11.9777C4.17592 11.3411 4.06075 10.673 4.05819 9.99996C4.0623 9.32799 4.17322 8.66075 4.38696 8.02225L4.38127 7.88968L1.19282 5.4624L1.08852 5.51101C0.372885 6.90343 0.00012207 8.4408 0.00012207 9.99987C0.00012207 11.5589 0.372885 13.0963 1.08852 14.4887L4.39911 11.9777Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M10.2042 3.86663C11.6663 3.84438 13.0804 4.37803 14.1498 5.35558L17.0296 2.59996C15.1826 0.901848 12.7366 -0.0298855 10.2042 -3.6784e-05C8.3126 -0.000477834 6.45819 0.514732 4.8483 1.48798C3.2384 2.46124 1.93649 3.85416 1.08813 5.51101L4.38775 8.02225C4.79132 6.82005 5.56974 5.77231 6.61327 5.02675C7.6568 4.28118 8.91279 3.87541 10.2042 3.86663Z"
                            fill="#EB4335"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_95:967">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    Sign up with Google
                  </button>
                </form>
                <p id="google-message" ref={googleMessageRef} className="text-center h-8 m-4 text-base font-medium text-red-400">
                  {googleMessage}
                </p>
                <div className="mb-8 flex items-center justify-center">
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                  <p className="w-full px-5 text-center text-base font-medium text-body-color">
                    Or, register with your email
                  </p>
                  <span className="hidden h-[1px] w-full max-w-[60px] bg-body-color/50 sm:block"></span>
                </div>
                <form onSubmit={registerSubmit}>
                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Email{" "}
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your Email"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                  </div>
                  <div className="mb-8 relative">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Your Password{" "}
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter your Password"
                      ref={passwordInputRef}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                    <button
                      id="password-switch"
                      type="button"
                      className="absolute mt-0 inset-y-0 right-0 flex items-center px-2 bg-transparent"
                      onClick={handlePasswordVisibility}
                    >
                      <EyeFill id="eye-icon" className="absolute right-2 bottom-2 text-3xl" />
                      <EyeSlashFill id="eye-slash-icon" className="hidden absolute right-2 bottom-2 text-3xl" />
                    </button>
                  </div>

                  <div className="mb-3 block text-sm text-dark dark:text-white">
                    <h3>Password must contain the following:</h3>
                    <ul className="list-disc pl-5">
                      <li>
                        <p id="letter" className="invalid">A <b>lowercase</b> letter</p>
                      </li>
                      <li>
                        <p id="capital" className="invalid">
                          A <b>capital (uppercase)</b> letter
                        </p>
                      </li>
                      <li><p id="number" className="invalid">A <b>number</b></p></li>
                      <li><p id="number" className="invalid">A special caracter .[]{ }()&lt;&gt; \^$|?*+!@#&lt;&gt;</p></li>
                      <li><p id="length" className="invalid">Minimum <b>8 characters</b></p></li>
                    </ul>
                  </div>

                  <div className="mb-4">
                    <button id="button-signup" className="shadow-submit dark:shadow-submit-dark flex w-full 
                    items-center justify-center rounded-sm
                     bg-primary px-9 py-4 text-base font-medium text-white duration-300
                      hover:bg-primary/90" disabled={isLoading}>
                      {isLoading ? 'Loading...' : 'Sign up'}
                    </button>
                  </div>
                </form>
                <p className="text-center text-base mt-4 font-medium text-body-color">
                  Already using Startup?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
                <p id="register-message" ref={registerMessageRef} className="text-center h-8 mt-1 text-base font-medium text-red-400">
                  {registerMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SignUpForm;
