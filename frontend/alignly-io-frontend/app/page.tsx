// import { Link } from "@nextui-org/link";
// import { Snippet } from "@nextui-org/snippet";
// import { Code } from "@nextui-org/code";
// import { button as buttonStyles } from "@nextui-org/theme";

// import { siteConfig } from "@/config/site";
// import { title, subtitle } from "@/components/primitives";
// import { GithubIcon } from "@/components/icons";

// export default function Home() {
//   return (
//     <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
//       <div className="inline-block max-w-xl text-center justify-center">
//         <span className={title()}>Make&nbsp;</span>
//         <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
//         <br />
//         <span className={title()}>
//           websites regardless of your design experience.
//         </span>
//         <div className={subtitle({ class: "mt-4" })}>
//           Beautiful, fast and modern React UI library.
//         </div>
//       </div>

//       <div className="flex gap-3">
//         <Link
//           isExternal
//           className={buttonStyles({
//             color: "primary",
//             radius: "full",
//             variant: "shadow",
//           })}
//           href={siteConfig.links.docs}
//         >
//           Documentation
//         </Link>
//         <Link
//           isExternal
//           className={buttonStyles({ variant: "bordered", radius: "full" })}
//           href={siteConfig.links.github}
//         >
//           <GithubIcon size={20} />
//           GitHub
//         </Link>
//       </div>

//       <div className="mt-8">
//         <Snippet hideCopyButton hideSymbol variant="bordered">
//           <span>
//             Get started by editing <Code color="primary">app/page.tsx</Code>
//           </span>
//         </Snippet>
//       </div>
//     </section>
//   );
// }
// app/chronoNoteLandingPage.tsx

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <h1 className="text-4xl font-bold">ChronoNote</h1>
        <p className="mt-4 text-lg">
          The Notebook that automatically records your deadlines and lets you
          focus on what matters most: your notes.
        </p>
      </div>

      <div className="flex gap-3 mt-6">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="#features"
        >
          Features
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href="#get-started"
        >
          Get Started
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Start organizing your life with{" "}
            <Code color="primary">ChronoNote</Code>
          </span>
        </Snippet>
      </div>

      <div className="mt-12 text-center" id="features">
        <h2 className="text-2xl font-semibold">Features</h2>
        <ul className="list-disc mt-4 text-left">
          <li>Automatic deadline tracking</li>
          <li>Focus on note-taking</li>
          <li>Seamless integration with calendars</li>
          <li>Customizable reminders</li>
        </ul>
      </div>

      <div className="mt-12 text-center" id="get-started">
        <h2 className="text-2xl font-semibold">Get Started</h2>
        <p className="mt-4">
          Sign up today and take control of your deadlines and notes.
        </p>
        <Link
          isExternal
          className={buttonStyles({
            color: "success",
            radius: "full",
            variant: "shadow",
          })}
          href="#signup"
        >
          Sign Up
        </Link>
      </div>
    </section>
  );
}

