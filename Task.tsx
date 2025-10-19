"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
  lang?: "en" | "ar"; // language prop
}

const translations = {
  en: {
    editTask: "Edit task",
    typeHere: "Type here",
    submit: "Submit",
    deleteConfirm: "Are you sure you want to delete this task?",
    yes: "Yes",
  },
  ar: {
    editTask: "تعديل المهمة",
    typeHere: "اكتب هنا",
    submit: "تأكيد",
    deleteConfirm: "هل أنت متأكد من حذف هذه المهمة؟",
    yes: "نعم",
  },
};

const Task: React.FC<TaskProps> = ({ task, lang = "en" }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const t = translations[lang]; // selected language

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className={`w-full ${lang === "ar" ? "text-right" : "text-left"}`}>
        {task.text}
      </td>
      <td className='flex gap-5'>
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor='pointer'
          className='text-blue-500'
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className='font-bold text-lg'>{t.editTask}</h3>
            <div className='modal-action'>
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type='text'
                placeholder={t.typeHere}
                className='input input-bordered w-full'
              />
              <button type='submit' className='btn'>
                {t.submit}
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor='pointer'
          className='text-red-500'
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className='text-lg'>{t.deleteConfirm}</h3>
          <div className='modal-action'>
            <button onClick={() => handleDeleteTask(task.id)} className='btn'>
              {t.yes}
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
