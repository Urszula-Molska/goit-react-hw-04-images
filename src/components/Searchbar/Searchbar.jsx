import css from './Searchbar.module.css';

export const Searchbar = ({ handleSubmit, children }) => {
  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.searchForm} id="search-form">
        <input
          className={css.searchFormInput}
          type="text"
          name="searchQuery"
          autoComplete="off"
          placeholder="Search images and photos"
        />
        <button className={css.searchFormButton} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};
