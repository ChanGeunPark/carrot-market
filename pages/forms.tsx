import React, { useState } from 'react'
import { FieldError, useForm } from 'react-hook-form'

// Less code ❤
// Better validation
// Better Erros (set, clear, display)
// Have control over inputs
// Dont deal whit events ❤
// Easier Inputs ❤

interface LoginForm{
  username:string;
  password: string;
  email: string;
  errors?: string;
}//type script


export default function Forms(){
  const { register, handleSubmit, formState:{ errors }, watch, setError, setValue, reset, resetField } = useForm<LoginForm>({
    mode: "onBlur"
  });//onBlut는 이풋 밖을 클릭했을때 리턴해준다

  const onValid = (data:LoginForm) => {
    console.log("im valid bby");
    setError("username", {message: "Taken username."});//여기서 막아준다.
    //reset();
    resetField("password");
  }

  const onInValid = (errors: FieldError) => {
    console.log(errors);
  }
  console.log(errors);
//handelSubmit은 두개의 펑션을 가져온다. 한개는 보낼것, 한개는 충족하지 않았을때

//setValue("username", "shkd");//해당 인풋안에 텍스트를 넣어준다.


  return(
    <form onSubmit={handleSubmit(onValid)}>
    <input
      {...register("username",{
        required:"Username is required",
        minLength:{
          message: "The username should be longer than 5 chars.",
          value:5,
        }
      })}
      type="text"
      placeholder='Username'
    />
    {errors.username?.message}
    {errors.email?.message  /* formState:{ errors }는 지금 이창의 모든 에러를 보여준다.*/}
    <input 
      {...register("email",{
        required:"Email is required",
        validate: {
          notGmail:(value) => !value.includes("@gmail.com") || "Gmail is not allowed",//include는 문자열이 특정 문자열을 포함하는지 확인
        },
      })}
      type="email"
      placeholder='Email' 
    />
    <input
      {...register("password",{
        required:"Password is required",
      })}
      type="password"
      placeholder='Password' 
    />
      <input type="submit" value="Create Account" />
      {errors.errors?.message}
    </form>
  )
}

//7.4