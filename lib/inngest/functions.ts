import { inngest } from "@/lib/inngest/client";
import { step } from "inngest";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";
import { text } from "stream/consumers";
export const sendSignUpEmail = inngest.createFunction(
    {id: 'sign-up-email', },
    {event:'app/user.created'},
    async({event,step })=>{
        const userProfile=`
        -Country: ${event.data.country}
        -Investment Goals: ${event.data.investmentGoals}
        -Risk Tolerance: ${event.data.riskTolerance}
        -Preferred Industry: ${event.data.preferredIndustry}
        `
        //  -Email: ${event.data.email}
        // -User ID: ${event.data.id}
        // -Sign Up Date: ${new Date(event.data.createdAt).toLocaleDateString()}
        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{user_profile}}', userProfile);

        const response=await step.ai.infer('generate-welcome-intro',{
            model: step.ai.models.gemini({model: 'gemini-2.5-flash-lite'}),
            body:{
                contents:[
                    {
                        role: 'user',
                        parts:[
                            {
                                text: prompt
                            }
                        ]
                    }
                ]
            }
        })

        await step.run('send-welcome-email', async()=>{
            const part =response.candidates?.[0]?.content?.parts?.[0];
            const introText=(part && 'text' in part) ? part.text : "Welcome to Fintide! You now have the tools to take control of your financial future and make smarter money moves.";
            //email sending logic here
        })
        return{
            success: true,
            message:'Welcome email sent successfully.'
        }
    }
)