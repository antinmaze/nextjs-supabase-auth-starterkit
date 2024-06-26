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
  const { error } = await supabase.auth.signInWithPassword({email, password,});
  if (error) {
    const responseBody = JSON.stringify({ error: error.message });
    return buildResponse(responseBody, error.status ?? 500, error.message);
  }
  //here Everything is OK
  const successMessage = "Authentifciation Success";
  const responseBody = JSON.stringify({ message: successMessage });
  return buildResponse(responseBody, 200, successMessage);
}
