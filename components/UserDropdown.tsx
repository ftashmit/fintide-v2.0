// "use client";
// import React, { use } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuPortal,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuSub,
//   DropdownMenuSubContent,
//   DropdownMenuSubTrigger,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useRouter } from "next/dist/client/components/navigation";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { LogOut } from "lucide-react";
// import NavItems from "./NavItems";
// const UserDropdown = () => {
//   const router = useRouter();

//   const handleSignOut = async () => {
//     // Perform sign-out logic here (e.g., clear auth tokens, update state)
//     // After sign-out, redirect to the homepage
//     router.push("/sign-in");
//   };

//   const user = { name: "John Doe", email: "john.doe@example.com" };

//   return (
//     <div>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             className="flex items-center gap-3 text-gray-4 hover:bg-yellow-500"
//           >
//             <Avatar className="h-8 w-8">
//               {/* modeluserimage */}
//               <AvatarImage src="https://github.com/shadcn.png" />
//               <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
//                 {user.name[0]}
//               </AvatarFallback>
//             </Avatar>
//             <div className="hidden md:flex flex-col items-start">
//               <span className="text-base text-gray-400 font-medium">
//                 {user.name}
//               </span>
//             </div>
//           </Button>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent className="text-gray-400">
//           <DropdownMenuLabel>
//             <div className="flex relative items-center gap-3 py-2">
//               <Avatar className="h-10 w-10">
//                 <AvatarImage src="https://github.com/shadcn.png" />
//                 <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
//                   {user.name[0]}
//                 </AvatarFallback>
//               </Avatar>

//               <div className="flex flex-col">
//                 <span className="text-base text-gray-400 font-medium">
//                   {user.name}
//                 </span>
//                 <span className="text-sm text-gray-500">{user.email}</span>
//               </div>
//             </div>
//           </DropdownMenuLabel>
//           <DropdownMenuSeparator className="bg-gray-600" />
//           <DropdownMenuItem
//             onClick={handleSignOut}
//             className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-red-400 transition-colors cursor-pointer"
//           >
//             <LogOut className="mr-2 h-4 w-4 hidden sm:block"></LogOut>Logout
//           </DropdownMenuItem>
//           <DropdownMenuSeparator className="hidden sm:block bg-gray-600" />
//           <nav className="block sm:hidden">
//             <NavItems />
//           </nav>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// };

// export default UserDropdown;
"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import NavItems from "./NavItems";
import { signOut } from "@/lib/actions/auth.actions";
const UserDropdown = ({ user }: { user: User }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    // Perform sign-out logic here (e.g., clear auth tokens, update state)
    // After sign-out, redirect to the homepage
    await signOut();

const UserDropdown = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    router.push("/sign-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3
                     bg-black/10 backdrop-blur-xl
                     border border-white/10
                     hover:bg-black/30
                     transition-colors"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-green-500 text-green-900 text-sm font-bold">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>

          <div className="hidden md:flex flex-col items-start">
            <span className="text-base text-gray-400 font-medium">
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="
          w-72
          bg-black/50 backdrop-blur-xl
          border border-white/10
          shadow-xl
          text-gray-300
        "
      >
        <DropdownMenuLabel>
          <div className="flex items-center gap-3 py-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-green-500 text-green-900 text-sm font-bold">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="text-base text-gray-300 font-medium">
                {user.name}
              </span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="
            text-gray-300 text-md font-medium
            focus:bg-white/10 focus:text-red-400
            hover:bg-white/10
            transition-colors cursor-pointer
          "
        >
          <LogOut className="mr-2 h-4 w-4 hidden sm:block" />
          Logout
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/10 hidden sm:block" />

        <nav className="block sm:hidden">
          <NavItems />
        </nav>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
