'use server'

import { createClient } from '@/utils/supabase/server'
import { NextRequest } from 'next/server'
import { buildResponse, isValidEmail, isValidPassword } from '@/utils/auth/factory'

export async function POST(request: NextRequest) {
  const supabase = createClient()
  const formData = await request.formData()

  //control the input email from the request
  const email = formData.get('email') as string;
  if (!isValidEmail(email)) {
    let errorMessage = "The input email is not valid.";
    const responseBody = JSON.stringify({ error: errorMessage });
    return buildResponse(responseBody, 401, errorMessage);
  }

  //control the input password from the request
  const password = formData.get('password') as string;
  if (!isValidPassword(password)) {
    let errorMessage = "The input password is not valid.";
    const responseBody = JSON.stringify({ error: errorMessage });
    return buildResponse(responseBody, 401, errorMessage);
  }

  //control the grant status from Supabase
  const { data, error } = await supabase.auth.signUp({email, password,});
  if (error) {
    //could be 429 "Email rate limit exceeded" message
    //could be 429 "For security purposes, you can only request this after 48 seconds.""
    const responseBody = JSON.stringify({ error: error.message });
    return buildResponse(responseBody, error.status ?? 500, error.message);
  }
  //here Everything is OK (Authenticated)
  const successMessage = "Welcome! Please confirm your account by clicking on the link sent to your mailbox."
  const responseBody = JSON.stringify({ message: successMessage });
  return buildResponse(responseBody, 200, successMessage);
}
