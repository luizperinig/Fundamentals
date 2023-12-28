import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

import styles from './Post.module.css';

// Formatação de Hora alternativa
/* const publishedDateFormatted = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
   }).format(publishedAt);
*/

interface Author {
   name: string;
   role: string;
   avatarUrl: string;
}

interface Content {
   type: 'paragraph' | 'link';
   content: string;
}

export interface PostType {
   id: number;
   author: Author;
   publishedAt: Date;
   content: Content[];
}

interface PostProps {
   post: PostType;
}

export function Post({post}: PostProps) {
   const [comments, setComments] = useState([
      'Me caguei kkkkk',
   ])
   const [newCommentText, setNewCommentText] = useState('')

   {/* Formatação de hora */}
   const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
      locale: ptBR,
   })

   {/* Formatação de Hora Relativa */}
   const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
      locale: ptBR,
      addSuffix: true,
   })

   {/* Criar novo Comentário */}
   function handleCreateNewComment(event: FormEvent) {
      event.preventDefault()

      setComments([...comments, newCommentText])
      setNewCommentText('')
   }

   function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
      event.target.setCustomValidity('')
      setNewCommentText(event.target.value)
   }

   function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
      event.target.setCustomValidity('Não deixe o comentário em branco')
   }

   function deleteComment(commentToDelete: string) {
      const commentsWithoutDeletedOne = comments.filter( comment => {
         return comment !== commentToDelete
      })

      setComments(commentsWithoutDeletedOne)
   }

   const isNewCommentEmpty = newCommentText.length == 0;

   return (
      <article className={styles.post}>

         <header>
            {/* Informações do Autor */}
            <div className={styles.author}>
               <Avatar src={post.author.avatarUrl} />
               <div className={styles.authorInfo}>
                  <strong>{post.author.name}</strong>
                  <span>{post.author.role}</span>
               </div>
            </div>

            {/* Data de Postagem */}
            <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
               {publishedDateRelativeToNow}
            </time>
         </header>

         {/* Conteúdo do Post */}
         <div className={styles.content}>
            {post.content.map( line => {
               if (line.type == 'paragraph') {
                  return <p key={line.content}>{line.content}</p>;
               } else if (line.type == 'link') {
                  return <p key={line.content}><a href="#">{line.content}</a></p>;
               }
            })}
         </div>

         {/* Formulário de Comentário */}
         <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
            <strong>Deixe seu feedback</strong>

            <textarea 
               name="comment"
               placeholder='Deixe um comentário'
               value={newCommentText}
               onChange={handleNewCommentChange}
               onInvalid={handleNewCommentInvalid}
               required
            />

            <footer>
               <button type="submit" disabled={isNewCommentEmpty}>
                  Publicar
               </button>
            </footer>
         </form>

         {/* Comentários do Post */}
         <div className={styles.commentList}>
            {comments.map( comment => {
               return (
                  <Comment 
                     key={comment} 
                     content={comment} 
                     onDeleteComment={deleteComment}
                  />
               )
            })}
         </div>

      </article>
   )
}