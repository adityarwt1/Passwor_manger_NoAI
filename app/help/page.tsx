'use client';

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        form.current as HTMLFormElement ,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          console.log('Email successfully sent!');
          (form.current as HTMLFormElement).reset();
        },
        (error) => {
          console.error('Error sending email:', error.text);
        }
      );
  };

  return (
    <div className='flex justify-center items-center min-h-screen p-4'>
      <div className='w-full max-w-md px-6 py-8 rounded-lg shadow-lg border'>
        <h2 className='text-center mb-6 text-2xl md:text-3xl font-bold'>Help & FAQs</h2>
        <form ref={form} onSubmit={sendEmail} className='flex flex-col w-full gap-4'>
          <div className='flex flex-col'>
            <label htmlFor="email" className='text-lg font-medium mb-2'>
              E-mail
            </label>
            <input
              type="email"
              required
              name="user_email"
              id="email"
              className='w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-zinc-950 transition duration-200'
              placeholder='Enter your email'
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor="topic" className='text-lg font-medium mb-2'>
              Topic
            </label>
            <textarea
              name="message"
              required
              rows={4}
              className='w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-zinc-950 resize-none transition duration-200'
              placeholder='Write the topic you need help with...'
            />
          </div>

          <button
            type='submit'
            className='w-full py-3 px-6 bg-zinc-950 text-white rounded-md hover:bg-zinc-800 transition duration-200 mt-2'
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
