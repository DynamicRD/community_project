import "./chunk-EQCVQC35.js";

// node_modules/@tosspayments/payment-widget-sdk/dist/index.esm.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2) _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2)) return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2)) return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
var cachedPromise = null;
function loadScript(src, namespace) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (cachedPromise != null) {
    return cachedPromise;
  }
  var promise = new Promise(function(resolve, reject) {
    try {
      var onLoad = function onLoad2() {
        if (getNamespace(namespace) != null) {
          resolve(getNamespace(namespace));
        } else {
          reject(new NamespaceNotAvailableError(namespace));
        }
      };
      var onError = function onError2() {
        reject(new ScriptLoadFailedError(src));
      };
      if (typeof window === "undefined" || typeof document === "undefined") {
        return resolve(null);
      }
      if (getNamespace(namespace) != null) {
        return resolve(getNamespace(namespace));
      }
      var existingScript = document.querySelector('script[src="'.concat(src, '"]'));
      if (existingScript != null) {
        var _existingScript$paren;
        existingScript.removeEventListener("load", onLoad);
        existingScript.removeEventListener("error", onError);
        (_existingScript$paren = existingScript.parentElement) === null || _existingScript$paren === void 0 ? void 0 : _existingScript$paren.removeChild(existingScript);
      }
      var script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", onLoad);
      script.addEventListener("error", onError);
      if (options.priority != null) {
        script.fetchPriority = options.priority;
      }
      document.head.appendChild(script);
    } catch (error) {
      reject(error);
      return;
    }
  });
  cachedPromise = promise["catch"](function(error) {
    cachedPromise = null;
    return Promise.reject(error);
  });
  return cachedPromise;
}
function getNamespace(name) {
  return window[name];
}
var NamespaceNotAvailableError = function(_Error) {
  _inherits(NamespaceNotAvailableError2, _Error);
  var _super = _createSuper(NamespaceNotAvailableError2);
  function NamespaceNotAvailableError2(namespace) {
    var _this;
    _classCallCheck(this, NamespaceNotAvailableError2);
    _this = _super.call(this, "[TossPayments SDK] ".concat(namespace, " is not available"));
    _this.name = "NamespaceNotAvailableError";
    return _this;
  }
  return NamespaceNotAvailableError2;
}(_wrapNativeSuper(Error));
var ScriptLoadFailedError = function(_Error2) {
  _inherits(ScriptLoadFailedError2, _Error2);
  var _super2 = _createSuper(ScriptLoadFailedError2);
  function ScriptLoadFailedError2(src) {
    var _this2;
    _classCallCheck(this, ScriptLoadFailedError2);
    _this2 = _super2.call(this, "[TossPayments SDK] Failed to load script: [".concat(src, "]"));
    _this2.name = "ScriptLoadFailedError";
    return _this2;
  }
  return ScriptLoadFailedError2;
}(_wrapNativeSuper(Error));
var SCRIPT_URL = "https://js.tosspayments.com/v1/payment-widget";
function loadPaymentWidget(clientKey, customerKey, options) {
  var loadOptions = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
  var _loadOptions$src = loadOptions.src, src = _loadOptions$src === void 0 ? SCRIPT_URL : _loadOptions$src;
  if (typeof window === "undefined") {
    return Promise.resolve({});
  }
  return loadScript(src, "PaymentWidget").then(function(PaymentWidget) {
    return PaymentWidget(clientKey, customerKey, options);
  });
}
function clearPaymentWidget() {
  var _script$parentElement;
  var script = document.querySelector('script[src="'.concat(SCRIPT_URL, '"]'));
  script === null || script === void 0 ? void 0 : (_script$parentElement = script.parentElement) === null || _script$parentElement === void 0 ? void 0 : _script$parentElement.removeChild(script);
  window.PaymentWidget = void 0;
}
var ANONYMOUS = "@@ANONYMOUS";
export {
  ANONYMOUS,
  clearPaymentWidget,
  loadPaymentWidget
};
//# sourceMappingURL=@tosspayments_payment-widget-sdk.js.map
