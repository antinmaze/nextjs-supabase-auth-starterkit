'use client';

import Link from "next/link";
import { useRef, useState }from 'react';
import EyeFill from '../../icons/EyeFill';
import EyeSlashFill from '../../icons/EyeSlashFill';
import { setPasswordVisibility } from "@/utils/auth/factory";
import { useRouter } from 'next/navigation';

const RecoverForm = () => {
  const router = useRouter();

  const [infoMessage, setInfoMessage] = useState('');
  const infoMessageRef = useRef<HTMLDivElement | null>(null);
  const [hasReset, setHasReset] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // état de chargement
  const TARGET_SUCCESS_PAGE = '/welcome';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (hasReset) return;
  
    setIsLoading(true); // set load status to true

    const formData = new FormData(event.currentTarget);
    const data = new FormData();
    data.set('password', formData.get('password') as string);
    data.set('confirm-password', formData.get('confirm-password') as string);

    try {
      const response = await fetch('/api/auth/recover/', {
        method: 'POST',
        body: data,
      });

      if (response.status >= 300) {
        setInfoMessage(response.statusText);
        infoMessageRef.current?.classList.remove('text-primary');
        infoMessageRef.current?.classList.add('text-red-400');        
      } else { //Successful connection
        setHasReset(true);
        const json = await response.json();
        const welcomeMessage = json.message;
        setInfoMessage(welcomeMessage);
        infoMessageRef.current?.classList.remove('text-red-400');
        infoMessageRef.current?.classList.add('text-primary');
        router.push(TARGET_SUCCESS_PAGE);
      }
    } catch (error) {
      setInfoMessage('An error has occurred. Please try again later.');
      infoMessageRef.current?.classList.remove('text-primary');
      infoMessageRef.current?.classList.add('text-red-400');        
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
  const confirmPasswordInputRef = useRef(null);
  const handleConfirmPasswordVisibility = () => {
    var eyeIconElement = document.getElementById("confirm-eye-icon") as HTMLInputElement;
    var eyeSlashIconElement = document.getElementById("confirm-eye-slash-icon") as HTMLInputElement;  
    setPasswordVisibility(confirmPasswordInputRef, eyeIconElement, eyeSlashIconElement); 
  };

  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Reset your Password
                </h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-8 relative">
                    <label
                      htmlFor="password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Password{" "}
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

                  <div className="mb-8 relative">
                    <label
                      htmlFor="confirm-password"
                      className="mb-3 block text-sm text-dark dark:text-white"
                    >
                      {" "}
                      Confirm Password{" "}
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      name="confirm-password"
                      placeholder="Confirm your Password"
                      ref={confirmPasswordInputRef}
                      className="border-stroke dark:text-body-color-dark dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none transition-all duration-300 focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:focus:border-primary dark:focus:shadow-none"
                    />
                      <button
                        id="password-switch"
                        type="button"
                        className="absolute mt-0 inset-y-0 right-0 flex items-center px-2 bg-transparent"
                        onClick={handleConfirmPasswordVisibility}
                      >
                        <EyeFill id="confirm-eye-icon" className="absolute right-2 bottom-2 text-3xl" />
                        <EyeSlashFill id="confirm-eye-slash-icon" className="hidden absolute right-2 bottom-2 text-3xl" />
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


                  <div className="mb-6">
                    <button className="shadow-submit dark:shadow-submit-dark flex w-full items-center justify-center rounded-sm
                     bg-primary px-9 py-4 text-base font-medium text-white duration-300
                      hover:bg-primary/90" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Reset Password'}
                    </button>
                    <p id="infomessage" ref={infoMessageRef} className="text-center h-8 pt-2 text-base font-medium text-red-400">
                  {infoMessage}
                </p>
                  </div>
                </form>
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

export default RecoverForm;
