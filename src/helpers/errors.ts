export const getErrorMessage = (status: number) => {
  switch (status) {
    case 404:
      return new Error("We couldn't find the show you're looking for.");
    case 500:
      return new Error(
        "There's a problem with our server. Please try again later."
      );
    case 408:
      return new Error(
        'The request timed out. Please check your connection and try again.'
      );
    default:
      return new Error('An unexpected error occurred. Please try again.');
  }
};
