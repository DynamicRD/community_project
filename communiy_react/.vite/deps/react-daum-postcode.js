import {
  require_react
} from "./chunk-4SFRHSJ3.js";
import {
  __toESM
} from "./chunk-EQCVQC35.js";

// node_modules/react-daum-postcode/lib/index.esm.js
var import_react = __toESM(require_react());
var s = function(e2, o2) {
  return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, o3) {
    e3.__proto__ = o3;
  } || function(e3, o3) {
    for (var t2 in o3) o3.hasOwnProperty(t2) && (e3[t2] = o3[t2]);
  }, s(e2, o2);
};
var p = function() {
  return p = Object.assign || function(e2) {
    for (var o2, t2 = 1, r2 = arguments.length; t2 < r2; t2++) for (var n2 in o2 = arguments[t2]) Object.prototype.hasOwnProperty.call(o2, n2) && (e2[n2] = o2[n2]);
    return e2;
  }, p.apply(this, arguments);
};
function a(e2, o2) {
  var t2 = {};
  for (var r2 in e2) Object.prototype.hasOwnProperty.call(e2, r2) && o2.indexOf(r2) < 0 && (t2[r2] = e2[r2]);
  if (null != e2 && "function" == typeof Object.getOwnPropertySymbols) {
    var n2 = 0;
    for (r2 = Object.getOwnPropertySymbols(e2); n2 < r2.length; n2++) o2.indexOf(r2[n2]) < 0 && Object.prototype.propertyIsEnumerable.call(e2, r2[n2]) && (t2[r2[n2]] = e2[r2[n2]]);
  }
  return t2;
}
var i;
var c = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
var u = (i = null, function(e2) {
  return void 0 === e2 && (e2 = c), i || (i = new Promise(function(o2, t2) {
    var r2 = document.createElement("script");
    r2.src = e2, r2.onload = function() {
      var e3;
      if (null === (e3 = null === window || void 0 === window ? void 0 : window.daum) || void 0 === e3 ? void 0 : e3.Postcode) return o2(window.daum.Postcode);
      t2(new Error("Script is loaded successfully, but cannot find Postcode module. Check your scriptURL property."));
    }, r2.onerror = function(e3) {
      return t2(e3);
    }, r2.id = "daum_postcode_script", document.body.appendChild(r2);
  }));
});
var l = import_react.default.createElement("p", null, "현재 Daum 우편번호 서비스를 이용할 수 없습니다. 잠시 후 다시 시도해주세요.");
var d = { width: "100%", height: 400 };
var f = { scriptUrl: c, errorMessage: l, autoClose: true };
var h = function(t2) {
  function r2() {
    var e2 = null !== t2 && t2.apply(this, arguments) || this;
    return e2.mounted = false, e2.wrap = (0, import_react.createRef)(), e2.state = { hasError: false, completed: false }, e2.initiate = function(o2) {
      if (e2.wrap.current) {
        var t3 = e2.props;
        t3.scriptUrl, t3.className, t3.style;
        var r3 = t3.defaultQuery, n2 = t3.autoClose;
        t3.errorMessage;
        var s2 = t3.onComplete, i2 = t3.onClose, c2 = t3.onResize, u2 = t3.onSearch, l2 = a(t3, ["scriptUrl", "className", "style", "defaultQuery", "autoClose", "errorMessage", "onComplete", "onClose", "onResize", "onSearch"]);
        new o2(p(p({}, l2), { oncomplete: function(o3) {
          s2 && s2(o3), e2.setState({ completed: true });
        }, onsearch: u2, onresize: c2, onclose: i2, width: "100%", height: "100%" })).embed(e2.wrap.current, { q: r3, autoClose: n2 });
      }
    }, e2.onError = function(o2) {
      console.error(o2), e2.setState({ hasError: true });
    }, e2;
  }
  return function(e2, o2) {
    function t3() {
      this.constructor = e2;
    }
    s(e2, o2), e2.prototype = null === o2 ? Object.create(o2) : (t3.prototype = o2.prototype, new t3());
  }(r2, t2), r2.prototype.componentDidMount = function() {
    var e2 = this.initiate, o2 = this.onError, t3 = this.props.scriptUrl;
    t3 && (this.mounted || (u(t3).then(e2).catch(o2), this.mounted = true));
  }, r2.prototype.render = function() {
    var o2 = this.props, t3 = o2.className, r3 = o2.style, n2 = o2.errorMessage, s2 = o2.autoClose, a2 = this.state, i2 = a2.hasError, c2 = a2.completed;
    return true === s2 && true === c2 ? null : import_react.default.createElement("div", { ref: this.wrap, className: t3, style: p(p({}, d), r3) }, i2 && n2);
  }, r2.defaultProps = f, r2;
}(import_react.Component);
function m(e2) {
  return void 0 === e2 && (e2 = c), (0, import_react.useEffect)(function() {
    u(e2);
  }, [e2]), (0, import_react.useCallback)(function(o2) {
    var t2 = p({}, o2), r2 = t2.defaultQuery, n2 = t2.left, s2 = t2.top, i2 = t2.popupKey, c2 = t2.popupTitle, l2 = t2.autoClose, d2 = t2.onComplete, f2 = t2.onResize, h2 = t2.onClose, m2 = t2.onSearch, y = t2.onError, v = a(t2, ["defaultQuery", "left", "top", "popupKey", "popupTitle", "autoClose", "onComplete", "onResize", "onClose", "onSearch", "onError"]);
    return u(e2).then(function(e3) {
      new e3(p(p({}, v), { oncomplete: d2, onsearch: m2, onresize: f2, onclose: h2 })).open({ q: r2, left: n2, top: s2, popupTitle: c2, popupKey: i2, autoClose: l2 });
    }).catch(y);
  }, [e2]);
}
export {
  h as DaumPostcodeEmbed,
  h as default,
  u as loadPostcode,
  m as useDaumPostcodePopup
};
//# sourceMappingURL=react-daum-postcode.js.map
