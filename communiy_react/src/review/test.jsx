import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();
  const [count, setCount] = useState();

  useEffect(() => {
    setCount(
      Number(Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000))
    );
    sendEmail;
  }, []);

  const sendEmail = (e) => {
    e.preventDefault(true);

    emailjs
      .sendForm('service_kbxhoci', 'template_hm8sjji', form.current, {
        publicKey: '1O5JRVECWcylUyPF0',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" value={count} readOnly />
      <input type="submit" value="Send" />
    </form>
  );
};
