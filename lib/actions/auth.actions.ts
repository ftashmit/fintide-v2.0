'use server';

import { email } from "better-auth";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";
import { headers } from "next/headers";


export const signUpWithEmail=async({email, password, fullName, country, investmentGoals, riskTolerance,preferredIndustry}:SignUpFormData)=> {
    try{
        const response=await auth.api.signUpEmail({
            body:{email,password,name:fullName}
        })
        if(response){
            await inngest.send({
                name:'app/user.created',
                data:{
                    email,
                    name:fullName,
                    country,
                    investmentGoals,
                    riskTolerance,
                    preferredIndustry
                }
            })
        }
        return{ success:true, data: response}
    }catch(e){
    console.error('Sign up failed ',e);
    return {success:false,error:'Sign up failed'}
}}

export const signOut= async()=>{
    try{
        await auth.api.signOut({headers:await headers()});
    }catch(e){
        console.error('Sign out failed ',e);
        return {success:false,error:'Sign out failed'}
    }
}

export const signInWithEmail=async({email, password}:SignInFormData)=> {
    try{
        const response=await auth.api.signInEmail({
            body:{email,password}
        })
     
        return{ success:true, data: response}
    }catch(e){
    console.error('Sign in failed ',e);
    return {success:false,error:'Sign in failed'}
}}