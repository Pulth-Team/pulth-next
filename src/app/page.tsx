import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-bold mt-24">Hello, Welcome to Pulth!</h1>
        <p>You can solve quizzes, read articles and discuss the new topics</p>

        <div className="flex gap-2 items-center">
            <Link href="/quizzes" className="border-green-500 bg-gray-800 hover:bg-gray-600 transition-colorsa duration-100 p-2 rounded">
                Explore
            </Link>
            <Link href="/login" className="border border-green-500 hover:border-green-700 p-2 rounded">
                Login
            </Link>
        </div>
    </div>
  );
}
