"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var formElem, loginElem, contentElem, consoleElem, mindateElem, archiveBtnElem, archiveReposElem, url, code, token, repos, i, repopage, renderArchiveList, renderArchiveBtn;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          renderArchiveBtn = function _renderArchiveBtn() {
            var l = 0;

            var _iterator3 = _createForOfIteratorHelper(repos),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var repo = _step3.value;
                var elem = document.getElementById('archive_' + repo.full_name);
                if (!elem) continue;
                if (!elem.checked) continue;
                l++;
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            archiveBtnElem.value = "Archive ".concat(l, " repos");
          };

          renderArchiveList = function _renderArchiveList() {
            archiveReposElem.innerHTML = '';

            var _iterator2 = _createForOfIteratorHelper(repos),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var repo = _step2.value;
                var pushed_at = new Date(repo.pushed_at);
                var current = Date.now();
                if (Number(pushed_at) > current - 1000 * 24 * 60 * 60 * mindateElem.value || repo.archived) continue;
                archiveReposElem.innerHTML += "<input type=\"checkbox\" id=\"archive_".concat(repo.full_name, "\" checked><label for=\"archive_").concat(repo.full_name, "\">").concat(repo.full_name, "(D+").concat(Math.floor((current - Number(pushed_at)) / 1000 / 24 / 60 / 60), ")</label><br/>");
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            renderArchiveBtn();
          };

          formElem = document.getElementById('form');
          loginElem = document.getElementById('login');
          contentElem = document.getElementById('content');
          consoleElem = document.getElementById('console');
          mindateElem = document.getElementById('mindate');
          archiveBtnElem = document.getElementById('archivebtn');
          archiveReposElem = document.getElementById('archiverepos');
          consoleElem.innerText += '> console attached\n';
          url = new URL(window.location.href);
          code = url.searchParams.get('code');

          if (code) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return");

        case 14:
          consoleElem.innerText += '> github oauth code found\n> request github oauth token. please wait...\n';
          window.history.replaceState({}, document.title, '/repocleaner/index.html');
          _context2.next = 18;
          return window.fetch('https://cors.pmhonly.workers.dev/?https://github.com/login/oauth/access_token?client_id=2a58b27c5db4b250935b&client_secret=e049f2d2f81cb81412459ecf6ad1a43c9d5969ec&code=' + code, {
            method: 'POST',
            headers: {
              Accept: 'application/json'
            }
          }).then(function (res) {
            return res.json();
          });

        case 18:
          token = _context2.sent;

          if (!token.error) {
            _context2.next = 24;
            break;
          }

          loginElem.style.display = 'block';
          contentElem.style.display = 'none';
          consoleElem.innerText += '> Error: invalid github oauth code\n';
          return _context2.abrupt("return");

        case 24:
          consoleElem.innerText += '> github oauth token granted\n';
          loginElem.style.display = 'none';
          contentElem.style.display = 'block';
          repos = [];
          i = 1;

        case 29:
          if (!true) {
            _context2.next = 40;
            break;
          }

          consoleElem.innerText += "> request repo page #".concat(i, "\n");
          _context2.next = 33;
          return window.fetch('https://cors.pmhonly.workers.dev/?https://api.github.com/user/repos?per_page=100&sort=pushed&affiliation=owner&page=' + i, {
            headers: {
              Accept: 'application/vnd.github.v3+json',
              Authorization: 'token ' + token.access_token
            }
          }).then(function (res) {
            return res.json();
          });

        case 33:
          repopage = _context2.sent;

          if (!(repopage.length < 1)) {
            _context2.next = 36;
            break;
          }

          return _context2.abrupt("break", 40);

        case 36:
          repos.push.apply(repos, _toConsumableArray(repopage));

        case 37:
          i++;
          _context2.next = 29;
          break;

        case 40:
          consoleElem.innerText += "> done.\n";
          renderArchiveList();

          mindateElem.onchange = function () {
            return renderArchiveList();
          };

          archiveReposElem.onchange = function () {
            return renderArchiveBtn();
          };

          formElem.onsubmit = function (event) {
            event.preventDefault();
            var finished = 1;
            var queue = [];

            var _iterator = _createForOfIteratorHelper(repos),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var repo = _step.value;
                var elem = document.getElementById('archive_' + repo.full_name);
                if (!elem) continue;
                if (!elem.checked) continue;
                queue.push(repo.full_name);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            if (!confirm("Queue: Archive ".concat(queue.length, " repos\n\n!warning! this process is unstoppable, continue?"))) return;

            var _loop = function _loop() {
              var repoFullname = _queue[_i];

              _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        consoleElem.innerText += "> archiving ".concat(repoFullname, "...\n");
                        _context.next = 3;
                        return window.fetch('https://cors.pmhonly.workers.dev/?https://api.github.com/repos/' + repoFullname, {
                          method: 'PATCH',
                          headers: {
                            Accept: 'application/vnd.github.v3+json',
                            Authorization: 'token ' + token.access_token,
                            'Content-Type': 'application/json'
                          },
                          body: "{\"archived\":true}"
                        });

                      case 3:
                        consoleElem.innerText += "> archived ".concat(repoFullname, "!\n");
                        finished++;
                        if (finished >= queue.length) alert('done!');

                      case 6:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }))();
            };

            for (var _i = 0, _queue = queue; _i < _queue.length; _i++) {
              _loop();
            }
          };

        case 45:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2);
}))();
