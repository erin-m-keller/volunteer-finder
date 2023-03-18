/**
 * @toggleLogin
 * Allows the user to toggle between the
 * login screen and create account screen
 */
function toggleLogin (elemId) {
    // initialize variables
    let tabContent = document.querySelectorAll('.tab-content');
    // loop through all elements with the class "tab-content"
    for (let i = 0; i < tabContent.length; i++) {
      // initialize variables
      let contentElem = tabContent[i],
          dataTarget = document.querySelector(`[data-target="${contentElem.id}"]`);
      // hide or show the tab content based on contentElem.id
      contentElem.style.display = contentElem.id === elemId ? 'block' : 'none';
      // switch the is-active class on the tabs based on contentElem.id
      dataTarget.classList[contentElem.id === elemId ? 'add' : 'remove']('is-active');
    }
  }