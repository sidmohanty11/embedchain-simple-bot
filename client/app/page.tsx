import Chat from "@/components/chat";
import FileUpload from "@/components/file-upload";

export default function Home() {
  return (
    <main className="container">
      <h1 className="text-4xl font-bold text-center mt-10">Embedchain Demo</h1>
      <FileUpload />
      <Chat />
    </main>
  );
}
