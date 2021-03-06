import React, { useState, Fragment,useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import useValidationErrors from '../../hooks/useValidationErrors/useValidationErrors';
import useModalContext from '../../hooks/useModalContext/useModalContext';
import useDocumentTitle from '../../hooks/useDocumentTitle/useDocumentTitle'
import useAuthContext from '../../hooks/useAuthContext/useAuthContext'
import Input from '../Input/Input';
import Logo from '../../assets/logo.svg';
import postData from '../../util/postData'
import getData from '../../util/getData'
const ReportForm = ({history,post}) => {
    const {userId,token} = useAuthContext()
    const {toggleModalReducer}  = useModalContext()
  const [rules,setRules]  = useState(null)
  const [rule,setRule]  = useState(null)
  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');
  useDocumentTitle('Sign Up')
  const {
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors
   } = useValidationErrors();
   
   useEffect(() => {
     const apiUrl = `http://localhost:8080/community/rules/get/${post.communityId}`
     getData(apiUrl)
     .then(data => {
         console.log(data)
         if(data.rules) setRules(data.rules)
     })
   }, [])
  const submitHandler = async e => {
    e.preventDefault();
    const apiUrl = `http://localhost:8080/community/report/${post._id}`
    if(rule){
        const {authorId,communityId,_id,author} = post
        const report = {
            author,
            authorId,
            ruleId:rule,
            communityId,
            reportAuthorId:userId
        }
        const responseData = await postData(apiUrl,report,token)
        console.log(responseData)
        if(responseData.msg === 'Reported successfully'){
          toggleModalReducer({on:false,message:null,Component:null})
        }
    }
  };
  const cancelHandler  = () => {
      toggleModalReducer({on:false,message:null,Component:null})
  }
  return (
    <form className="form" onSubmit={e => submitHandler(e)}>
      <ValidationErrorsList validationErrorMessages={validationErrorMessages} />
      <label className="label">Report Post</label>
      {rules ?   
      <select className="input" defaultValue="default" onChange={e => setRule(e.target.value)} >
    <option  value="default"  disabled="disabled">Select A Rule</option>
      {
         rules.map(rule => <option key={rule._id} value={rule._id}>{rule.title}</option>) 
      }
      </select> : '' }
    
      <div className="buttons-container">
      <button className="button">Report</button>
      <button onClick={cancelHandler} className="button">Cancel</button></div>
     
    </form>
  );
};
export default withRouter(ReportForm);
