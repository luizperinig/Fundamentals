import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from './Avatar';
import { useState } from 'react';
import styles from './Comment.module.css';
import gorila from '../assets/foto-gorila.png';

interface CommentProps {
   content: string;
   onDeleteComment: (content: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {
   const [likeCount, setLikeCount] = useState(0);

   function handleDeleteComment() {
      onDeleteComment(content);
   }

   function handleLikeComment() {
      setLikeCount((state) => {
         return state + 1
      });
   }

   return (
      <div className={styles.comment}>

         <Avatar hasBorder={false} src={gorila} />

         <div className={styles.commentBox}>
            <div className={styles.commentContent}>

               <header>

                  <div className={styles.authorAndTime}>
                     <strong>Luiz Perini</strong>
                     <time title="03 de Agosto às 15:45h" dateTime="2023-08-03 15:45:00">Cerca de 1h atrás</time>
                  </div>

                  <button onClick={handleDeleteComment} title="Deletar comentário">
                     <Trash size={24}/>
                  </button>

               </header>

               <p>{content}</p>

            </div>

            <footer>
               <button onClick={handleLikeComment}>
                  <ThumbsUp/>
                  Aplaudir <span>{likeCount}</span>
               </button>
            </footer>

         </div>

      </div>
   )
}