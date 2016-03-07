// Generated by CoffeeScript 1.4.0
(function() {
  var SwaggerApi, SwaggerModel, SwaggerModelProperty, SwaggerOperation, SwaggerRequest, SwaggerResource,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  SwaggerApi = (function() {

    SwaggerApi.prototype.discoveryUrl = "http://api.wordnik.com/v4/resources.json";

    SwaggerApi.prototype.debug = false;

    SwaggerApi.prototype.api_key = null;

    SwaggerApi.prototype.basePath = null;

    function SwaggerApi(options) {
      if (options == null) {
        options = {};
      }
      if (options.discoveryUrl != null) {
        this.discoveryUrl = options.discoveryUrl;
      }
      if (options.debug != null) {
        this.debug = options.debug;
      }
      this.apiKeyName = options.apiKeyName != null ? options.apiKeyName : 'api_key';
      if (options.apiKey != null) {
        this.api_key = options.apiKey;
      }
      if (options.api_key != null) {
        this.api_key = options.api_key;
      }
      if (options.verbose != null) {
        this.verbose = options.verbose;
      }
      this.supportHeaderParams = options.supportHeaderParams != null ? options.supportHeaderParams : false;
      this.supportedSubmitMethods = options.supportedSubmitMethods != null ? options.supportedSubmitMethods : ['get'];
      if (options.success != null) {
        this.success = options.success;
      }
      this.failure = options.failure != null ? options.failure : function() {};
      this.progress = options.progress != null ? options.progress : function() {};
      this.headers = options.headers != null ? options.headers : {};
      this.booleanValues = options.booleanValues != null ? options.booleanValues : new Array('true', 'false');
      this.discoveryUrl = this.suffixApiKey(this.discoveryUrl);
      if (options.success != null) {
        this.build();
      }
    }

    SwaggerApi.prototype.build = function() {
      var _this = this;
      this.progress('fetching resource list: ' + this.discoveryUrl);
      return jQuery.getJSON(this.discoveryUrl, function(response) {
        var res, resource, _i, _j, _len, _len1, _ref, _ref1;
        if (response.apiVersion != null) {
          _this.apiVersion = response.apiVersion;
        }
        if ((response.basePath != null) && jQuery.trim(response.basePath).length > 0) {
          _this.basePath = response.basePath;
/*
          FIXME: Comment this stuff back in e.g. remove the hack
          if (_this.basePath.match(/^HTTP/i) == null) {
            _this.fail("discoveryUrl basePath must be a URL.");
          }
*/
          _this.basePath = _this.basePath.replace(/\/$/, '');
        } else {
          if (_this.discoveryUrl.indexOf('?') > 0) {
            _this.basePath = _this.discoveryUrl.substring(0, _this.discoveryUrl.lastIndexOf('?'));
          } else {
            _this.basePath = _this.discoveryUrl;
          }
          log('derived basepath from discoveryUrl as ' + _this.basePath);
        }
        _this.apis = {};
        _this.apisArray = [];
        if (response.resourcePath != null) {
          _this.resourcePath = response.resourcePath;
          res = null;
          _ref = response.apis;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            resource = _ref[_i];
            if (res === null) {
              res = new SwaggerResource(resource, _this);
            } else {
              res.addOperations(resource.path, resource.operations);
            }
          }
          if (res != null) {
            _this.apis[res.name] = res;
            _this.apisArray.push(res);
            res.ready = true;
            _this.selfReflect();
          }
        } else {
          _ref1 = response.apis;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            resource = _ref1[_j];
            res = new SwaggerResource(resource, _this);
            _this.apis[res.name] = res;
            _this.apisArray.push(res);
          }
        }
        return _this;
      }).error(function(error) {
        if (_this.discoveryUrl.substring(0, 4) !== 'http') {
          return _this.fail('Please specify the protocol for ' + _this.discoveryUrl);
        } else if (error.status === 0) {
          return _this.fail('Can\'t read from server.  It may not have the appropriate access-control-origin settings.');
        } else if (error.status === 404) {
          return _this.fail('Can\'t read swagger JSON from ' + _this.discoveryUrl);
        } else {
          return _this.fail(error.status + ' : ' + error.statusText + ' ' + _this.discoveryUrl);
        }
      });
    };

    SwaggerApi.prototype.selfReflect = function() {
      var resource, resource_name, _ref;
      if (this.apis == null) {
        return false;
      }
      _ref = this.apis;
      for (resource_name in _ref) {
        resource = _ref[resource_name];
        if (resource.ready == null) {
          return false;
        }
      }
      this.setConsolidatedModels();
      this.ready = true;
      if (this.success != null) {
        return this.success();
      }
    };

    SwaggerApi.prototype.fail = function(message) {
      this.failure(message);
      throw message;
    };

    SwaggerApi.prototype.setConsolidatedModels = function() {
      var model, modelName, resource, resource_name, _i, _len, _ref, _ref1, _results;
      this.modelsArray = [];
      this.models = {};
      _ref = this.apis;
      for (resource_name in _ref) {
        resource = _ref[resource_name];
        for (modelName in resource.models) {
          if (!(this.models[modelName] != null)) {
            this.models[modelName] = resource.models[modelName];
            this.modelsArray.push(resource.models[modelName]);
          }
        }
      }
      _ref1 = this.modelsArray;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        model = _ref1[_i];
        _results.push(model.setReferencedModels(this.models));
      }
      return _results;
    };

    SwaggerApi.prototype.suffixApiKey = function(url) {
      var sep;
      if ((this.api_key != null) && jQuery.trim(this.api_key).length > 0 && (url != null)) {
        sep = url.indexOf('?') > 0 ? '&' : '?';
        return url + sep + this.apiKeyName + '=' + this.api_key;
      } else {
        return url;
      }
    };

    SwaggerApi.prototype.help = function() {
      var operation, operation_name, parameter, resource, resource_name, _i, _len, _ref, _ref1, _ref2;
      _ref = this.apis;
      for (resource_name in _ref) {
        resource = _ref[resource_name];
        console.log(resource_name);
        _ref1 = resource.operations;
        for (operation_name in _ref1) {
          operation = _ref1[operation_name];
          console.log("  " + operation.nickname);
          _ref2 = operation.parameters;
          for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
            parameter = _ref2[_i];
            console.log("    " + parameter.name + (parameter.required ? ' (required)' : '') + " - " + parameter.description);
          }
        }
      }
      return this;
    };

    return SwaggerApi;

  })();

  SwaggerResource = (function() {

    function SwaggerResource(resourceObj, api) {
      var parts,
        _this = this;
      this.api = api;
      this.path = this.api.resourcePath != null ? this.api.resourcePath : resourceObj.path;
      this.description = resourceObj.description;
      parts = this.path.split("/");
      this.name = parts[parts.length - 1].replace('.{format}', '');
      this.basePath = this.api.basePath;
      console.log('bp: ' + this.basePath);
      this.operations = {};
      this.operationsArray = [];
      this.modelsArray = [];
      this.models = {};
      if ((resourceObj.operations != null) && (this.api.resourcePath != null)) {
        this.api.progress('reading resource ' + this.name + ' models and operations');
        this.addModels(resourceObj.models);
        this.addOperations(resourceObj.path, resourceObj.operations);
        this.api[this.name] = this;
      } else {
        if (this.path == null) {
          this.api.fail("SwaggerResources must have a path.");
        }
        this.url = this.api.suffixApiKey(this.api.basePath + this.path.replace('{format}', 'json'));
        console.log('basePath: ' + this.api.basePath);
        console.log('url: ' + this.url);
        this.api.progress('fetching resource ' + this.name + ': ' + this.url);
        jQuery.getJSON(this.url, function(response) {
          var endpoint, _i, _len, _ref;
          if ((response.basePath != null) && jQuery.trim(response.basePath).length > 0) {
            _this.basePath = response.basePath;
            _this.basePath = _this.basePath.replace(/\/$/, '');
          }
          _this.addModels(response.models);
          if (response.apis) {
            _ref = response.apis;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              endpoint = _ref[_i];
              _this.addOperations(endpoint.path, endpoint.operations);
            }
          }
          _this.api[_this.name] = _this;
          _this.ready = true;
          return _this.api.selfReflect();
        }).error(function(error) {
          return _this.api.fail("Unable to read api '" + _this.name + "' from path " + _this.url + " (server returned " + error.statusText + ")");
        });
      }
    }

    SwaggerResource.prototype.addModels = function(models) {
      var model, modelName, swaggerModel, _i, _len, _ref, _results;
      if (models != null) {
        for (modelName in models) {
          if (!(this.models[modelName] != null)) {
            swaggerModel = new SwaggerModel(modelName, models[modelName]);
            this.modelsArray.push(swaggerModel);
            this.models[modelName] = swaggerModel;
          }
        }
        _ref = this.modelsArray;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          model = _ref[_i];
          _results.push(model.setReferencedModels(this.models));
        }
        return _results;
      }
    };

    SwaggerResource.prototype.addOperations = function(resource_path, ops) {
      var consumes, err, errorResponses, o, op, _i, _j, _len, _len1, _results;
      if (ops) {
        _results = [];
        for (_i = 0, _len = ops.length; _i < _len; _i++) {
          o = ops[_i];
          consumes = o.consumes;
          if (o.supportedContentTypes) {
            consumes = o.supportedContentTypes;
          }
          errorResponses = o.responseMessages;
          if (errorResponses) {
            for (_j = 0, _len1 = errorResponses.length; _j < _len1; _j++) {
              err = errorResponses[_j];
              err.reason = err.message;
            }
          }
          if (o.errorResponses) {
            errorResponses = o.errorResponses;
          }
          if (o.method) {
            o.httpMethod = o.method;
          }
          op = new SwaggerOperation(o.nickname, resource_path, o.httpMethod, o.parameters, o.summary, o.notes, o.responseClass, errorResponses, this, o.consumes, o.produces);
          this.operations[op.nickname] = op;
          _results.push(this.operationsArray.push(op));
        }
        return _results;
      }
    };

    SwaggerResource.prototype.help = function() {
      var operation, operation_name, parameter, _i, _len, _ref, _ref1;
      _ref = this.operations;
      for (operation_name in _ref) {
        operation = _ref[operation_name];
        console.log("  " + operation.nickname);
        _ref1 = operation.parameters;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          parameter = _ref1[_i];
          console.log("    " + parameter.name + (parameter.required ? ' (required)' : '') + " - " + parameter.description);
        }
      }
      return this;
    };

    return SwaggerResource;

  })();

  SwaggerModel = (function() {

    function SwaggerModel(modelName, obj) {
      var propertyName;
      this.name = obj.id != null ? obj.id : modelName;
      this.properties = [];
      for (propertyName in obj.properties) {
        this.properties.push(new SwaggerModelProperty(propertyName, obj.properties[propertyName]));
      }
    }

    SwaggerModel.prototype.setReferencedModels = function(allModels) {
      var prop, _i, _len, _ref, _results;
      _ref = this.properties;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        prop = _ref[_i];
        if (allModels[prop.dataType] != null) {
          _results.push(prop.refModel = allModels[prop.dataType]);
        } else if ((prop.refDataType != null) && (allModels[prop.refDataType] != null)) {
          _results.push(prop.refModel = allModels[prop.refDataType]);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    SwaggerModel.prototype.getMockSignature = function(modelsToIgnore) {
      var classClose, classOpen, prop, propertiesStr, returnVal, strong, strongClose, stronger, _i, _j, _len, _len1, _ref, _ref1;
      propertiesStr = [];
      _ref = this.properties;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        prop = _ref[_i];
        propertiesStr.push(prop.toString());
      }
      strong = '<span class="strong">';
      stronger = '<span class="stronger">';
      strongClose = '</span>';
      classOpen = strong + this.name + ' {' + strongClose;
      classClose = strong + '}' + strongClose;
      returnVal = classOpen + '<div>' + propertiesStr.join(',</div><div>') + '</div>' + classClose;
      if (!modelsToIgnore) {
        modelsToIgnore = [];
      }
      modelsToIgnore.push(this);
      _ref1 = this.properties;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        prop = _ref1[_j];
        if ((prop.refModel != null) && (modelsToIgnore.indexOf(prop.refModel)) === -1) {
          returnVal = returnVal + ('<br>' + prop.refModel.getMockSignature(modelsToIgnore));
        }
      }
      return returnVal;
    };

    SwaggerModel.prototype.createJSONSample = function(modelsToIgnore) {
      var prop, result, _i, _len, _ref;
      result = {};
      modelsToIgnore = modelsToIgnore || [];
      modelsToIgnore.push(this.name);
      _ref = this.properties;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        prop = _ref[_i];
        result[prop.name] = prop.getSampleValue(modelsToIgnore);
      }
      return result;
    };

    return SwaggerModel;

  })();

  SwaggerModelProperty = (function() {

    function SwaggerModelProperty(name, obj) {
      this.name = name;
      this.dataType = obj.type;
      this.isCollection = this.dataType && (this.dataType.toLowerCase() === 'array' || this.dataType.toLowerCase() === 'list' || this.dataType.toLowerCase() === 'set');
      this.descr = obj.description;
      this.required = obj.required;
      if (obj.items != null) {
        if (obj.items.type != null) {
          this.refDataType = obj.items.type;
        }
        if (obj.items.$ref != null) {
          this.refDataType = obj.items.$ref;
        }
      }
      this.dataTypeWithRef = this.refDataType != null ? this.dataType + '[' + this.refDataType + ']' : this.dataType;
      if (obj.allowableValues != null) {
        this.valueType = obj.allowableValues.valueType;
        this.values = obj.allowableValues.values;
        if (this.values != null) {
          this.valuesString = "'" + this.values.join("' or '") + "'";
        }
      }
    }

    SwaggerModelProperty.prototype.getSampleValue = function(modelsToIgnore) {
      var result;
      if ((this.refModel != null) && (modelsToIgnore.indexOf(this.refModel.name) === -1)) {
        result = this.refModel.createJSONSample(modelsToIgnore);
      } else {
        if (this.isCollection) {
          result = this.refDataType;
        } else {
          result = this.dataType;
        }
      }
      if (this.isCollection) {
        return [result];
      } else {
        return result;
      }
    };

    SwaggerModelProperty.prototype.toString = function() {
      var req, str;
      req = this.required ? 'propReq' : 'propOpt';
      str = '<span class="propName ' + req + '">' + this.name + '</span> (<span class="propType">' + this.dataTypeWithRef + '</span>';
      if (!this.required) {
        str += ', <span class="propOptKey">optional</span>';
      }
      str += ')';
      if (this.values != null) {
        str += " = <span class='propVals'>['" + this.values.join("' or '") + "']</span>";
      }
      if (this.descr != null) {
        str += ': <span class="propDesc">' + this.descr + '</span>';
      }
      return str;
    };

    return SwaggerModelProperty;

  })();

  SwaggerOperation = (function() {

    function SwaggerOperation(nickname, path, httpMethod, parameters, summary, notes, responseClass, errorResponses, resource, consumes, produces) {
      var parameter, v, _i, _j, _len, _len1, _ref, _ref1, _ref2,
        _this = this;
      this.nickname = nickname;
      this.path = path;
      this.httpMethod = httpMethod;
      this.parameters = parameters != null ? parameters : [];
      this.summary = summary;
      this.notes = notes;
      this.responseClass = responseClass;
      this.errorResponses = errorResponses;
      this.resource = resource;
      this.consumes = consumes;
      this.produces = produces;
      this["do"] = __bind(this["do"], this);

      if (this.nickname == null) {
        this.resource.api.fail("SwaggerOperations must have a nickname.");
      }
      if (this.path == null) {
        this.resource.api.fail("SwaggerOperation " + nickname + " is missing path.");
      }
      if (this.httpMethod == null) {
        this.resource.api.fail("SwaggerOperation " + nickname + " is missing httpMethod.");
      }
      this.path = this.path.replace('{format}', 'json');
      this.httpMethod = this.httpMethod.toLowerCase();
      this.isGetMethod = this.httpMethod === "get";
      this.resourceName = this.resource.name;
      if (((_ref = this.responseClass) != null ? _ref.toLowerCase() : void 0) === 'void') {
        this.responseClass = void 0;
      }
      if (this.responseClass != null) {
        this.responseClassSignature = this.getSignature(this.responseClass, this.resource.models);
        this.responseSampleJSON = this.getSampleJSON(this.responseClass, this.resource.models);
      }
      this.errorResponses = this.errorResponses || [];
      _ref1 = this.parameters;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        parameter = _ref1[_i];
        parameter.name = parameter.name || parameter.dataType;
        if (parameter.dataType.toLowerCase() === 'boolean') {
          parameter.allowableValues = {};
          parameter.allowableValues.values = this.resource.api.booleanValues;
        }
        parameter.signature = this.getSignature(parameter.dataType, this.resource.models);
        parameter.sampleJSON = this.getSampleJSON(parameter.dataType, this.resource.models);
        if (parameter.allowableValues != null) {
          if (parameter.allowableValues.valueType === "RANGE") {
            parameter.isRange = true;
          } else {
            parameter.isList = true;
          }
          if (parameter.allowableValues.values != null) {
            parameter.allowableValues.descriptiveValues = [];
            _ref2 = parameter.allowableValues.values;
            for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
              v = _ref2[_j];
              if ((parameter.defaultValue != null) && parameter.defaultValue === v) {
                parameter.allowableValues.descriptiveValues.push({
                  value: v,
                  isDefault: true
                });
              } else {
                parameter.allowableValues.descriptiveValues.push({
                  value: v,
                  isDefault: false
                });
              }
            }
          }
        }
      }
      this.resource[this.nickname] = function(args, callback, error) {
        return _this["do"](args, callback, error);
      };
    }

    SwaggerOperation.prototype.isListType = function(dataType) {
      if (dataType.indexOf('[') >= 0) {
        return dataType.substring(dataType.indexOf('[') + 1, dataType.indexOf(']'));
      } else {
        return void 0;
      }
    };

    SwaggerOperation.prototype.getSignature = function(dataType, models) {
      var isPrimitive, listType;
      listType = this.isListType(dataType);
      isPrimitive = ((listType != null) && models[listType]) || (models[dataType] != null) ? false : true;
      if (isPrimitive) {
        return dataType;
      } else {
        if (listType != null) {
          return models[listType].getMockSignature();
        } else {
          return models[dataType].getMockSignature();
        }
      }
    };

    SwaggerOperation.prototype.getSampleJSON = function(dataType, models) {
      var isPrimitive, listType, val;
      listType = this.isListType(dataType);
      isPrimitive = ((listType != null) && models[listType]) || (models[dataType] != null) ? false : true;
      val = isPrimitive ? void 0 : (listType != null ? models[listType].createJSONSample() : models[dataType].createJSONSample());
      if (val) {
        val = listType ? [val] : val;
        return JSON.stringify(val, null, 2);
      }
    };

    SwaggerOperation.prototype["do"] = function(args, callback, error) {
      var body, headers;
      if (args == null) {
        args = {};
      }
      if ((typeof args) === "function") {
        error = callback;
        callback = args;
        args = {};
      }
      if (error == null) {
        error = function(xhr, textStatus, error) {
          return console.log(xhr, textStatus, error);
        };
      }
      if (callback == null) {
        callback = function(data) {
          return console.log(data);
        };
      }
      if (args.headers != null) {
        headers = args.headers;
        delete args.headers;
      }
      if (args.body != null) {
        body = args.body;
        delete args.body;
      }
      return new SwaggerRequest(this.httpMethod, this.urlify(args), headers, body, callback, error, this);
    };

    SwaggerOperation.prototype.pathJson = function() {
      return this.path.replace("{format}", "json");
    };

    SwaggerOperation.prototype.pathXml = function() {
      return this.path.replace("{format}", "xml");
    };

    SwaggerOperation.prototype.urlify = function(args, includeApiKey) {
      var param, queryParams, reg, url, _i, _len, _ref;
      if (includeApiKey == null) {
        includeApiKey = true;
      }
      url = this.resource.basePath + this.pathJson();
      _ref = this.parameters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        param = _ref[_i];
        if (param.paramType === 'path') {
          if (args[param.name]) {
            reg = new RegExp('\{' + param.name + '[^\}]*\}', 'gi');
            url = url.replace(reg, encodeURIComponent(args[param.name]));
            delete args[param.name];
          } else {
            throw "" + param.name + " is a required path param.";
          }
        }
      }
      if (includeApiKey && (this.resource.api.api_key != null) && this.resource.api.api_key.length > 0) {
        args[this.apiKeyName] = this.resource.api.api_key;
      }
      if (this.supportHeaderParams()) {
        queryParams = jQuery.param(this.getQueryParams(args, includeApiKey));
      } else {
        queryParams = jQuery.param(this.getQueryAndHeaderParams(args, includeApiKey));
      }
      if ((queryParams != null) && queryParams.length > 0) {
        url += "?" + queryParams;
      }
      return url;
    };

    SwaggerOperation.prototype.supportHeaderParams = function() {
      return this.resource.api.supportHeaderParams;
    };

    SwaggerOperation.prototype.supportedSubmitMethods = function() {
      return this.resource.api.supportedSubmitMethods;
    };

    SwaggerOperation.prototype.getQueryAndHeaderParams = function(args, includeApiKey) {
      if (includeApiKey == null) {
        includeApiKey = true;
      }
      return this.getMatchingParams(['query', 'header'], args, includeApiKey);
    };

    SwaggerOperation.prototype.getQueryParams = function(args, includeApiKey) {
      if (includeApiKey == null) {
        includeApiKey = true;
      }
      return this.getMatchingParams(['query'], args, includeApiKey);
    };

    SwaggerOperation.prototype.getHeaderParams = function(args, includeApiKey) {
      if (includeApiKey == null) {
        includeApiKey = true;
      }
      return this.getMatchingParams(['header'], args, includeApiKey);
    };

    SwaggerOperation.prototype.getMatchingParams = function(paramTypes, args, includeApiKey) {
      var matchingParams, name, param, value, _i, _len, _ref, _ref1;
      matchingParams = {};
      _ref = this.parameters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        param = _ref[_i];
        if ((jQuery.inArray(param.paramType, paramTypes) >= 0) && args[param.name]) {
          matchingParams[param.name] = args[param.name];
        }
      }
      if (includeApiKey && (this.resource.api.api_key != null) && this.resource.api.api_key.length > 0) {
        matchingParams[this.resource.api.apiKeyName] = this.resource.api.api_key;
      }
      if (jQuery.inArray('header', paramTypes) >= 0) {
        _ref1 = this.resource.api.headers;
        for (name in _ref1) {
          value = _ref1[name];
          matchingParams[name] = value;
        }
      }
      return matchingParams;
    };

    SwaggerOperation.prototype.help = function() {
      var parameter, _i, _len, _ref;
      _ref = this.parameters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        parameter = _ref[_i];
        console.log("    " + parameter.name + (parameter.required ? ' (required)' : '') + " - " + parameter.description);
      }
      return this;
    };

    return SwaggerOperation;

  })();

  SwaggerRequest = (function() {

    function SwaggerRequest(type, url, headers, body, successCallback, errorCallback, operation) {
      var obj,
        _this = this;
      this.type = type;
      this.url = url;
      this.headers = headers;
      this.body = body;
      this.successCallback = successCallback;
      this.errorCallback = errorCallback;
      this.operation = operation;
      if (this.type == null) {
        throw "SwaggerRequest type is required (get/post/put/delete).";
      }
      if (this.url == null) {
        throw "SwaggerRequest url is required.";
      }
      if (this.successCallback == null) {
        throw "SwaggerRequest successCallback is required.";
      }
      if (this.errorCallback == null) {
        throw "SwaggerRequest error callback is required.";
      }
      if (this.operation == null) {
        throw "SwaggerRequest operation is required.";
      }
      if (this.operation.resource.api.verbose) {
        console.log(this.asCurl());
      }
      this.headers || (this.headers = {});
      if (this.operation.resource.api.api_key != null) {
        this.headers[this.apiKeyName] = this.operation.resource.api.api_key;
      }
      if (this.headers.mock == null) {
        obj = {
          type: this.type,
          url: this.url,
          data: JSON.stringify(this.body),
          dataType: 'json',
          error: function(xhr, textStatus, error) {
            return _this.errorCallback(xhr, textStatus, error);
          },
          success: function(data) {
            return _this.successCallback(data);
          }
        };
        if (obj.type.toLowerCase() === "post" || obj.type.toLowerCase() === "put") {
          obj.contentType = "application/json";
        }
        jQuery.ajax(obj);
      }
    }

    SwaggerRequest.prototype.asCurl = function() {
      var header_args, k, v;
      header_args = (function() {
        var _ref, _results;
        _ref = this.headers;
        _results = [];
        for (k in _ref) {
          v = _ref[k];
          _results.push("--header \"" + k + ": " + v + "\"");
        }
        return _results;
      }).call(this);
      return "curl " + (header_args.join(" ")) + " " + this.url;
    };

    return SwaggerRequest;

  })();

  window.SwaggerApi = SwaggerApi;

  window.SwaggerResource = SwaggerResource;

  window.SwaggerOperation = SwaggerOperation;

  window.SwaggerRequest = SwaggerRequest;

  window.SwaggerModelProperty = SwaggerModelProperty;

}).call(this);
