# nextjs-supabase-auth-starterkit
🔥 Next.js 14 Starterkit using Supabase (Auth and Database), Tailwind CSS 3.4, TypeScript and Vitest for unit testing based on the 🚀 NextJSTemplates Next.js Tailwind Startup Template
https://github.com/NextJSTemplates/startup-nextjs


################### UNDER CONSTRUCTION ################### 

Features

    - Supabase Authentification: Login/Password SignUp, Signin & Sign Out using Supabase.auth
    - Proof Key for Code Exchange (PKCE)
    - Authentification Error Management (using the handlesubmit and api mechanisms) 
    - Responsive Navbar using the NextJSTemplates Next.js Tailwind Startup Template including Dark mode
    - Managing Forgot/Recover Password
    - Adding of some 2E2 Tests on Signin & SignUp using Cypress

App Architecture

    Nextjs
    React
    TypeScript
    Supabase
    TailwindCSS
    NextJSTemplates Template
    Postcss
    Prettier
    Vitest
    Cypress
    

Backlog

    OIDC Authentification Using Google 
    Supabase Refresh Token (Keep me sign in)
    Implementing the user Profile dedicated page
    Implementing the restricted acess dashboard page 


Deployment

    This is a simple Next.js project run with npm.
    First, you need to declare Supabase Environment Variables by creating a .env.local file containing the following variables.
    Populate themn with your Supabase connection variables:
    
      NEXT_PUBLIC_SUPABASE_URL=<SUBSTITUTE_SUPABASE_URL>
      NEXT_PUBLIC_SUPABASE_ANON_KEY=<SUBSTITUTE_SUPABASE_ANON_KEY>
    
    See the documentation for further details: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs
    
    To run the project in a development environment, execute the following command: 
    npm run dev
    or ./dev.sh
    
License

    MIT 
