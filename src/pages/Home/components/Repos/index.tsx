import type { UserRepo } from '../../types';

function Repo({ full_name, description }: UserRepo) {
  return (
    <div className="repos__item">
      <div>
        <h3 className="repos__item-name">
          <i className="bi bi-journal-bookmark-fill"> </i>
          {full_name}
        </h3>
        <span className="repos__item-description">{description}</span>
      </div>
      <div className="repos__item-star">
        <i className="bi bi-star-fill"> </i>
        <span> Star</span>
      </div>
    </div>
  );
}

export default Repo;
