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

  //resetPasswordForEmail from Supabase
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) {
    const responseBody = JSON.stringify({ error: error.message });
    return buildResponse(responseBody, error.status ?? 500, error.message);
  }
  //here Everything is OK
  const successMessage = "A mail has been sent to your mailbox with the instructions to reset your password.";
  const responseBody = JSON.stringify({ message: successMessage });
  return buildResponse(responseBody, 200, successMessage);
}
