"use strict";
// Copyright 2018 Knowledge Expert SA
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
Object.defineProperty(exports, "__esModule", { value: true });
class SetValueByJs {
    async perform(element, ...args) {
        const webelement = await element.getWebElement();
        /* tslint:disable:no-string-literal */
        const driver = element['driver'];
        /* tslint:enable:no-string-literal */
        const value = args[0];
        const script = `return (function(webelement, text) {
                    var maxlength = webelement.getAttribute('maxlength') == null
                        ? -1
                        : parseInt(webelement.getAttribute('maxlength'));
                    webelement.value = maxlength == -1 ? text
                            : text.length <= maxlength ? text
                                : text.substring(0, maxlength);
                    return null;
                    })(arguments[0], arguments[1]);`;
        await webelement.clear();
        await driver.executeScript(script, webelement, String(value));
    }
}
exports.SetValueByJs = SetValueByJs;
//# sourceMappingURL=setValueByJs.js.map