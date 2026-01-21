import React from 'react';

function AboutMe() {
  const aboutMe = [
    'Webエンジニアとして働きながら、個人開発や技術ブログを書いています',
    '',
    'このサイトでは、個人開発で作成したものや技術書の紹介をしています',
    'また個人開発の備忘録や学習した内容もブログとしてまとめています',
  ];
  return (
    <div className="w-full py-16">
      {aboutMe.map((item, index) =>
        item === '' ? (
          <br key={index} />
        ) : (
          <p
            key={item}
            className="w-full lg:text-lg text-base font-sub-logo tracking-[0.02em] mb-1"
          >
            {item}
          </p>
        )
      )}
    </div>
  );
}

export default AboutMe;
