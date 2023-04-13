import React from 'react'
import { Link , useParams} from 'react-router-dom'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from '../../components/Avatar/Avatar'
import {deleteAnswer} from '../../actions/question'
const DisplayAnswer = ({question}) => {
    const dispatch = useDispatch() 
    const User = useSelector((state) => (state.currentUserReducer));
    const { id } = useParams()
    const handleDelete = (answerId, noOfAnswers ) =>{
        dispatch(deleteAnswer(id , answerId , noOfAnswers - 1))
    }
  return (
    <div>
        {
            question.answer.map((ans)=>(
                <div className='display-ans' key={ans._id}>
                    <p>{ans.answerBody}</p>
                    <div className="question-action-user">
                        <div>
                            <button>share</button>
                            {
                                User?.result?._id === ans?.userId && (
                                    <button type='button' onClick={() => handleDelete(ans._id , question.noOfAnswers)} >Delete</button>
                                )
                            }
                        </div>
                        <div>
                            <p>answer {moment(ans.answeredOn).fromNow()}</p>
                            <Link to={`/Users/${ans.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                <Avatar backgroundColor='green' px='8px' py='5px'>{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                <div>
                                    {ans.userAnswer}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default DisplayAnswer