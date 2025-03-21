import { OpenAIChat } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { Message, LangChainStream, StreamingTextResponse } from "ai";
import {
  FewShotPromptTemplate,
  LengthBasedExampleSelector,
} from "langchain/prompts";

import {
  ChatPromptTemplate,
  FewShotChatMessagePromptTemplate,
} from "langchain/prompts";
export const runtime = "edge";

export async function POST(req: Request) {
  const request = await req.json();
  let { messages, promptCount }: { messages: Message[]; promptCount: number } =
    request;

  console.log(messages);

  const userMessage: Message = messages.at(-1)!;

  if (userMessage.role === "system") return new Response("");

  const { handlers, stream } = LangChainStream();

  const llm = new OpenAIChat({
    streaming: true,
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
    prefixMessages: messages as any,
  });

  const k = "function add(a, b) {\n\treturn a + b;\n}"
  const examples = [
    // {
    //   input: "Generate Code for BubbleSort in javascript.",
    //   output: `function bubbleSort(arr) {\n\tlet n = arr.length;\n\tlet swapped;\n\tdo {\n\t\tswapped = false;\n\t\tfor (let i = 0; i < n - 1; i++) {\n\t\t\tif (arr[i] > arr[i + 1]) {\n\t\t\t\t// Swap the elements\n\t\t\t\tlet temp = arr[i];\n\t\t\t\tarr[i] = arr[i + 1];\n\t\t\t\tarr[i + 1] = temp;\n\t\t\t\tswapped = true;\n\t\t\t}\n\t\t}\n\t\t// Reduce n because the largest element will be at the end\n\t\tn--;\n\t} while (swapped);\n\treturn arr;\n}\n\n// Example usage:\nlet array = [64, 34, 25, 12, 22, 11, 90];\nconsole.log("Sorted array:", bubbleSort(array));`,
    // },

    // {
    //   input: "Write a function in JavaScript that adds two numbers.",
    //   output: k,
    // },

    // {
    //   input: "Make simple React To-Do List App.",
    //   output: `import React, { useState } from 'react';

    //   function App() {
    //     const [tasks, setTasks] = useState([]);
    //     const [newTask, setNewTask] = useState('');

    //     const addTask = () => {
    //       if (newTask) {
    //         setTasks([...tasks, newTask]);
    //         setNewTask('');
    //       }
    //     };

    //     const deleteTask = (index) => {
    //       const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    //       setTasks(updatedTasks);
    //     };

    //     return (
    //       <div>
    //         <h1>To-Do List</h1>
    //         <input
    //           type="text"
    //           value={newTask}
    //           onChange={(e) => setNewTask(e.target.value)}
    //           placeholder="Add a new task"
    //         />
    //         <button onClick={addTask}>Add</button>
    //         <ul>
    //           {tasks.map((task, index) => (
    //             <li key={index}>
    //               {task}
    //               <button onClick={() => deleteTask(index)}>Delete</button>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     );
    //   }

    //   export default App;
    //   `,
    // },
    {
      input: "Explain node js in about 50 words.",
      output: `Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. Known for its event-driven, non-blocking I/O model, Node.js enables efficient development of scalable network applications, particularly web servers, making it popular for full-stack and server-side development.`,
    },
    {
      input: "Who is the president of France?",
      output: `I cannot respond as that is not a MERN stack related question.`,
    },
  ];

  const examplePrompt = ChatPromptTemplate.fromTemplate(`Human: {input}
AI: {output}`);

  const fewShotPrompt = new FewShotChatMessagePromptTemplate({
    prefix:
      "Generate code for the following input all code should be in a single file:",
    suffix: "Human: {input}",
    examplePrompt,
    examples,
    inputVariables: ["input"],
  });
  // const formattedPrompt = await fewShotPrompt.format({
  //   input: "What's France's main city?",
  // });

  const formattedPrompt = await fewShotPrompt.format({
    input: JSON.parse(userMessage.content).input as string,
  });

  llm.call(formattedPrompt, {}, [handlers]).catch(console.error);

  return new StreamingTextResponse(stream);
}
