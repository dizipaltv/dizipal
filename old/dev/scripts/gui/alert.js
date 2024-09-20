/**
 * @name                fvuarjs
 * @version             0.0.5
 * @author              ahmetcanisik
 * @long_name           Fast Visual User Alerts Resource
 * @description         Notification message library with a modern look for your project!
 * @licence             MIT
 */

class Defines {
  static CONFIG = {
    MAXCOUNT: 4,
    MAXTIME: 4,
    DEFAULTTIME: 4,
    DEFAULTTHEME: "default",
    DEFAULTPOSITION: "top-right",
    CPALERT: false,
    ALERTOFFSET: 70,
    CLOSEMETHOD: "click",
    HOVERTOTOP: false,
    CLICKTOCLOSE: "click",
    MULTIPLY: false
  }

  static SUCCESS = "success";
  static ERROR = "error";
  static DEFAULT = "default";
  static WARNING = "warning";
  static INFO = "info";
  static ORANGE = "orange";
  static PREFIX = "fvuar-alert";

  static POS = {
    "top-left": 10,
    "top-center": 10,
    "top-right": 10,
    "center-left": 10,
    "center": 10,
    "center-right": 10,
    "bottom-left": 10,
    "bottom-center": 10,
    "bottom-right": 10
  }
}

class FvUtils {
  // tota = typofthealerts, It parses all alert elements according to their types and classifies them.
  static tota(e, d = undefined) {
    if (e === 1) {
      return `${Defines.PREFIX}-${Defines.ERROR}`;
    } else {
      return `${Defines.PREFIX}-${d}`;
    }
  }

  // reposAlert = reposition alert, It repositions alerts according to the values ​​in Defines.POS.
  static reposAlert(elem, toWhere, pos, rm = false, multiply = Defines.CONFIG.MULTIPLY) {
    // If a delete call is sent, i.e. rm === true, reduce the alert's position to 50.
    if (rm) {
      if (multiply) {
        Defines.POS[toWhere] -= Defines.CONFIG.ALERTOFFSET;
      }
      return;
    }

    // classification according to the given position.
    switch (pos) {
      case 'top':
        elem.style.top = `${Defines.POS[toWhere]}px`;
        break;
      case 'bottom':
        elem.style.bottom = `${Defines.POS[toWhere]}px`;
        break;
      case 'center':
        elem.style.top = `calc(50% + ${Defines.POS[toWhere]}px)`;
        if (toWhere === "center-left") {
          elem.style.left = '10px';
          elem.style.right = 'auto';
          elem.style.transform = 'translateY(-50%)';
        } else if (toWhere === "center-right") {
          elem.style.right = '10px';
          elem.style.left = 'auto';
          elem.style.transform = 'translateY(-50%)';
        } else {
          elem.style.left = '50%';
          elem.style.right = 'auto';
          elem.style.transform = 'translate(-50%, -50%)';
        }
        break;
      default:
        break;
    }
    elem.classList.add(`bubble-${pos}`);
    if (multiply) {
      Defines.POS[toWhere] += elem.offsetHeight + Defines.CONFIG.ALERTOFFSET;
    }
  }
}

class Fvuar {
  static LEN = 0;
  static fvAlert = document.createElement("fv-alert");

  static configure(options = Defines.CONFIG) {
    Defines.CONFIG = { ...Defines.CONFIG, ...options }
    console.log(Defines.CONFIG);
  }

  // Here is our main alert function. It is not recommended that the user access it (recommended newAlert) but the user has the authority to access it.
  static alert({ theme, position, text, displayTime, css, clickToClose }) {
    try {
      if (!Fvuar.fvAlert.parentNode) {
        document.body.appendChild(Fvuar.fvAlert);
      }
      /* options
  * dt : display time
  */
      let dt = displayTime * 1000;

      // create Elements
      let fvContainer = document.createElement("fv-container");
      let fvText = document.createElement("fv-text");

      // sav = setAlertVisibility, Our function to control whether alert exists or disappears: setAlertVisibility
      const sav = (visibility, counter = false) => {
        if (visibility === 'none') {
          fvContainer.remove();
          if (counter) {
            Fvuar.LEN -= 1;
            FvUtils.reposAlert(fvContainer, position, position.split('-')[0], true, Defines.CONFIG.MULTIPLY);
          }
        } else if (visibility === 'flex') {
          Fvuar.LEN += 1;
          fvContainer.style.display = 'flex';
        } else {
          console.error("sav() fonksiyonu iki parametre alır: ['flex','none'], Counter(boolean)")
        }
      };

      // Style the alert according to the given theme.
      switch (theme) {
        case Defines.ERROR:
          fvContainer.className = FvUtils.tota(1);
          break;
        case Defines.DEFAULT:
          fvContainer.className = FvUtils.tota(0, Defines.DEFAULT);
          break;
        case Defines.WARNING:
          fvContainer.className = FvUtils.tota(0, Defines.WARNING);
          break;
        case Defines.SUCCESS:
          fvContainer.className = FvUtils.tota(0, Defines.SUCCESS);
          break;
        case Defines.INFO:
          fvContainer.className = FvUtils.tota(0, Defines.INFO);
          break;
        case Defines.ORANGE:
          fvContainer.className = FvUtils.tota(0, Defines.ORANGE);
          break;
        default:
          console.error("Please write success, warning or error. usage should be createAlert({ e: 'success', a: 'Your message' })");
      }

      // user preferences
      if (css) {
        Object.assign(fvContainer.style, css);
      }

      // rattpgbtu = reposition according to the position given by the user, Our function where we reposition our alert element according to the position given by the user.
      Object.keys(Defines.POS).forEach(pos => fvContainer.classList.remove(`${pos}`));
      fvContainer.classList.add(`${position}`);
      FvUtils.reposAlert(fvContainer, position, position.split('-')[0], false, Defines.CONFIG.MULTIPLY);

      // We classify our elements.
      fvContainer.classList.add(`fvc`);
      fvText.classList.add(`fvt`);

      // We place the elements into their parents.
      if (!Defines.CONFIG.MULTIPLY) {
        Fvuar.fvAlert.innerHTML = "";
      }
      Fvuar.fvAlert.appendChild(fvContainer);
      fvText.innerHTML = text;
      fvContainer.appendChild(fvText);

      // alert'imizin görünürlüğünü sav(set alert visibility) ile görünür kılıyoruz.
      sav('flex');

      // timer ile dt(display time) içerisinde yer alan süre kadar görünür kılınsın ardından yok olsun diyoruz.
      let timer = setTimeout(() => {
        sav('none', true);
      }, dt);

      // If click to close is enabled, we add the event listener for closing the alert on click.
      if (clickToClose) {
        fvContainer.addEventListener('click', () => {
          clearTimeout(timer);
          sav('none', true);
        });
      }
    } catch (err) {
      console.error("Ups! An error occurred while creating the alert!", err);
    }
  }

  // new = create new alert
  static new({ theme = Defines.CONFIG.DEFAULTTHEME, position = Defines.CONFIG.DEFAULTPOSITION, text, displayTime = Defines.CONFIG.DEFAULTTIME, css = null, clickToClose = Defines.CONFIG.CLICKTOCLOSE }) {
    if (Defines.CONFIG.MULTIPLY && Fvuar.LEN >= Defines.CONFIG.MAXCOUNT) {
      console.warn(`You have reached the maximum number of alerts. Defines.CONFIG.MAXCOUNT: ${Defines.CONFIG.MAXCOUNT}`);
      return;
    }
    Fvuar.alert({ theme, position, text, displayTime, css, clickToClose });
  }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = Fvuar;
} else {
  window.Fvuar = Fvuar;
}
