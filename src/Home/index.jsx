import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { api } from '../services/api';
import fullStars from '../assets/fullStars.svg';
import Star from '../assets/Stars.svg';
import SanCarousel from 'sancarousel';
import styles from './styles.module.scss';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [newsletter, setNewsletter] = useState(false);
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);

  async function loadProducts() {
    const response = await api.get('products');

    const data = response.data.map((product) => ({
      ...product,
    }));

    setProducts(data);
  }

  loadProducts();

  async function submitForm(event) {
    event.preventDefault();

    if (!formValidation()) return;

    await api
      .post('newsletter', {
        name,
        email,
      })
      .then((response) => {
        setNewsletter(true);
      });
  }

  function completeStars(countStars) {
    let listStars = [];

    for (let i = 1; i <= 5; i++) {
      listStars.push(
        <img
          key={'star' + i}
          src={i <= countStars ? fullStars : Star}
          alt={'Stars'}
        />
      );
    }

    return listStars;
  }

  function convertPrice(price) {
    const convertedPrice = price / 100;
    return convertedPrice.toFixed(2).toLocaleString('pt-BR');
  }

  function emailValidation(email) {
    const redux =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return redux.test(String(email).toLocaleLowerCase());
  }

  function resetEmail() {
    setNewsletter(false);
  }

  function nameValidation(name) {
    return name.length > 1;
  }

  function formValidation() {
    let validation = true;

    if (emailValidation(email)) {
      setEmailError(null);
    } else {
      setEmailError('Preencha o campo de Email corretamente');
      validation = false;
    }

    if (nameValidation(name)) {
      setNameError(null);
    } else {
      setNameError('Por favor preencha o campo Nome');
      validation = false;
    }

    return validation;
  }

  const slides = [
    {
      img: 'https://lh3.googleusercontent.com/lao_kQDYRUclY0wIA9426Y2aEMQWyyQmyhgDza5SbRw82Kf5QT7LPzz23yFsk7ll7TqJxXvq8fBmMf4SFm-FyppjeYwQYF0XUbpk8Pe71jzMsT0RZlW6nklvn7lHWhOQX5XKVSuGdHKE76RfrGj6FJtzCbzlDGaiDtyTy3u1CTzxBWOJlkbkI0rma8pRScSv54Fj0PGa45wU_V-Gm-vgorjth7DUTJnyn6ZRRA7op0sE91c6ipOT47RcgBY2UPvpvrMnRGWCFE66e0qcGTXsRRJpa6dYWObBxFSmiS170EU3J_Jqi4lqJxCv5EEKD0-cLaFG6gtpKIh3DPjVL3EwV9ezdzByY3Cl0xxcDG3TVbbcS9dfAxDiHt0TVSF6WHKXIFjHQWaIt18fmAQerQ32zZiF3MYjlPifF8rtWaUrp8g2ufNHOQlpClMiSvliojLuibYKHA4JxrRnYsiULgiH6XjZH9sJV300ixQ6Xfdf3X9xiAwrajsl6EyVkV0YhunL6YDyluf0yNTxdUgEhJyEWBZ-28Rn7hg1Q3qZ3PRxBSlthV4ZUrn3yFIFyXZ_bx-14cN7mJecBYFVjlONAdqZ4NvYY5ZFG8GxuC2WTCzwkEfmgo78BlROwIQW0IhgNyvMpf9j9ybSfdRifPhavqDWRdmyRgWGm7EOnOGbW8I5iEZV9lLCfyIxmCWmChpnJswa9WAI-s6nEJ4vjOa5kg2lyl-Szw=w1197-h230-no?authuser=0',
    },
    {
      img: 'https://images.unsplash.com/photo-1512990414788-d97cb4a25db3?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODN8fHNob2VzfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
    },
  ];

  return (
    <main className={styles.content}>
      <div className={styles.carrosel}>
        <SanCarousel slides={slides} height="300px" autoPlay={3000} />
      </div>

      <div className={styles.subTitle}>
        <h2>Mais vendidos</h2>
        <hr />
      </div>

      <section className={styles.cardContainer}>
        {products.map((product) => (
          <div className={styles.card}>
            <img src={product.imageUrl} alt={product.productName} />
            <p className={styles.description}>{product.productName}</p>
            <span className={styles.stars}>{completeStars(product.stars)}</span>
            <p className={styles.listPrice}>
              {product.listPrice != null
                ? 'de R$ ' + convertPrice(product.listPrice)
                : null}
            </p>
            <p className={styles.price}>por R$ {convertPrice(product.price)}</p>
            <p className={styles.installments}>
              {product.installments.length > 0
                ? 'ou em' +
                  product.installments[0].quantity +
                  'x de R$' +
                  convertPrice(product.installments[0].value)
                : null}
            </p>
            <button type="button">Comprar</button>
          </div>
        ))}
      </section>

      <div className={styles.Form}>
        {newsletter ? (
          <div className={styles.formNewsletter}>
            <span>Nome e E-mail cadastrado com sucesso!</span>
            <button onClick={resetEmail}>Cadastrar novo e-mail</button>
          </div>
        ) : (
          <>
            <h3>Participe de nossas news com promoções e novidades</h3>
            <form onSubmit={submitForm}>
              <input
                value={name}
                type="name"
                className={nameError ? styles.inputError : styles.input}
                onChange={(event) => setName(event.target.value)}
                placeholder="Digite seu nome"
              />
              {nameError && <p className={styles.textError}>{nameError}</p>}
              <input
                value={email}
                type="e-mail"
                className={emailError ? styles.inputError : styles.input}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Digite seu email"
              />
              {emailError && <p className={styles.textError}>{emailError}</p>}
              <button type="submit">Eu quero!</button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
