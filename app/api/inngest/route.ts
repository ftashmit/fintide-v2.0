import { inngest } from "@/lib/inngest/client";
import { sendDailyNewsSummary, sendSignUpEmail } from "@/lib/inngest/functions";
import { serve } from "inngest/next";
import { send } from "process";

export const {GET, POST, PUT}= serve({
    client: inngest,
    functions: [sendSignUpEmail, sendDailyNewsSummary],
})