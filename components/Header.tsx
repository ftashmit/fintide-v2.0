// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import NavItems from "./NavItems";
// import UserDropdown from "./UserDropdown";

// const Header = () => {
//   return (
//     <header className="sticky top-0 header">
//       <div className="container header-wrapper">
//         <Link href="/">
//           <Image
//             src="/assets/icons/logo.png"
//             alt="Fintide Logo"
//             width={200}
//             height={50}
//             className="h-10 w-auto cursor-pointer"
//           />
//         </Link>
//         <nav className="hidden sm:block">
//           <NavItems />
//         </nav>
//         <UserDropdown />
//       </div>
//     </header>
//   );
// };

// export default Header;

import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      {/* Green glow */}
      {/* <div
        className="
          pointer-events-none absolute bottom-0 left-0 h-[2px] w-full
          bg-gradient-to-r from-transparent via-green-500/80 to-transparent
          blur-md animate-[fadeGlow_2s_ease-out_forwards]
        "
      /> */}

      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <Image
            src="/assets/icons/logo.png"
            alt="Fintide Logo"
            width={200}
            height={50}
            className="h-10 w-auto cursor-pointer"
          />
        </Link>

        <nav className="hidden sm:block">
          <NavItems />
        </nav>

        <UserDropdown />
      </div>
    </header>
  );
};

export default Header;
