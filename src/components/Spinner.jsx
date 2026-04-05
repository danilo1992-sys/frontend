const Spinner = () => {
  return (
    <button class="btn btn-primary btn-square btn-disabled" aria-label="Loading Button">
      <span class="loading loading-spinner loading-sm">
        Guardando evento...
      </span>
    </button>
  );
};

export default Spinner;
