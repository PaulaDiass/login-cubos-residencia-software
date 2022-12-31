type Props = {
  userData: {
    avatar_url?: string;
    name?: string;
    bio?: string;
    company?: string;
    location?: string;
    email?: string;
    twitter_username?: string;
    html_url?: string;
    blog?: string;
  };
  mobileProfile: boolean;
};

// fetch de organizações não está funcionando na API //

function Profile({ userData, mobileProfile }: Props) {
  return (
    <div className={mobileProfile ? 'profile--mobile' : 'profile'}>
      <img
        className="profile__avatar"
        src={userData.avatar_url}
        alt="avatar"
      ></img>
      <div className="profile__title">
        <h3 className="profile__title-name">{userData.name}</h3>
        <h4 className="profile__title-bio">{userData.bio}</h4>
      </div>
      <div className="profile__info">
        {userData.company ? (
          <p className="profile__item">
            <i className="bi bi-buildings-fill"></i>
            <span>{userData.company}</span>
          </p>
        ) : null}

        <p className="profile__item">
          <i className="bi bi-geo-alt-fill"></i>
          <span>{userData.location}</span>
        </p>

        {userData.email ? (
          <p className="profile__item">
            <i className="bi bi-envelope-fill"></i>
            <span>{userData.email}</span>
          </p>
        ) : null}

        {userData.twitter_username ? (
          <p className="profile__item">
            <i className="bi bi-twitter"></i>
            <span>{userData.twitter_username}</span>
          </p>
        ) : null}

        <a
          className="profile__item"
          href={userData.html_url}
          target="_blank"
          rel="noreferrer"
        >
          <i className="bi bi-github"></i>
          GitHub
        </a>

        {userData.blog ? (
          <a
            className="profile__item"
            href={userData.blog}
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-linkedin"></i>
            LinkedIn
          </a>
        ) : null}
      </div>
      {/* <div className="profile__organizations">
        <h2>Organizações</h2>
      </div> */}
    </div>
  );
}

export default Profile;
