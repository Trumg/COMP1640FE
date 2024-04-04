/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ChangePasswordRequestDto {
  oldPassword?: string | null;
  newPassword?: string | null;
}

export interface CreateContributionRequestDto {
  title?: string | null;
  /** @format uuid */
  facultyId?: string;
  /** @format uuid */
  userId?: string;
  status?: string | null;
  approval?: boolean;
  images?: string | null;
  documents?: string | null;
}

export interface CreateFacultyRequestDto {
  /**
   * Name of Faculty
   * @minLength 1
   * @example "Admin"
   */
  name: string;
}

export interface CreateRoleRequestDto {
  /**
   * Name of Role
   * @minLength 1
   * @example "Admin"
   */
  name: string;
}

export interface CreateUserRequestDto {
  /**
   * Email Address
   * @format email
   * @minLength 1
   * @example "trung@gmail.com"
   */
  username: string;
  /**
   * Password
   * @format password
   * @minLength 1
   * @example "Abcd1234?"
   */
  password: string;
  /**
   * First name
   * @minLength 1
   * @example "Le Duy"
   */
  firstName: string;
  /**
   * Last name
   * @minLength 1
   * @example "Trong"
   */
  lastName: string;
  /**
   * Birthdate
   * @format date-time
   * @example "2000-12-22T07:16:45.261"
   */
  birthDate: string;
}

export interface LoginRequestDto {
  /**
   * User Name
   * @example "hao@gmail.com"
   */
  username?: string | null;
  /**
   * Password
   * @example "Abcd1234?"
   */
  password?: string | null;
}

export interface RegisterRequestDto {
  /**
   * Email Address
   * @format email
   * @minLength 1
   * @example "tranthehao246810@gmail.com"
   */
  username: string;
  /**
   * Password
   * @format password
   * @minLength 1
   * @example "Abcd1234?"
   */
  password: string;
  /**
   * Confirmed Password
   * @format password
   * @minLength 1
   * @example "Abcd1234?"
   */
  confirmPassword: string;
  /**
   * First name
   * @minLength 1
   * @example "Tran The"
   */
  firstName: string;
  /**
   * Last name
   * @minLength 1
   * @example "Hao"
   */
  lastName: string;
  /**
   * Birthdate
   * @format date-time
   * @example "2003-04-21T07:16:45.261"
   */
  birthDate: string;
}

export interface UpdateContributionDto {
  title?: string | null;
  /** @format date-time */
  submissionDate?: string;
  /** @format date-time */
  closureDate?: string;
  images?: string | null;
  documents?: string | null;
}

export interface UpdateFacultyRequestDto {
  /**
   * The recent Update time
   * @format date-time
   */
  lastUpdatedAt?: string;
  /**
   * Name of Faculty
   * @minLength 1
   * @example "Admin"
   */
  name: string;
}

export interface UpdateRoleRequestDto {
  /**
   * The recent Update time
   * @format date-time
   */
  lastUpdatedAt?: string;
  /**
   * Name of Role
   * @minLength 1
   * @example "Admin"
   */
  name: string;
}

export interface UpdateUserRequestDto {
  /**
   * The recent Update time
   * @format date-time
   */
  lastUpdatedAt?: string;
  /**
   * First name
   * @minLength 1
   * @example "Le Duy"
   */
  firstName: string;
  /**
   * Last name
   * @minLength 1
   * @example "Trong"
   */
  lastName: string;
  /**
   * Biology of User
   * @maxLength 500
   * @example "this is me"
   */
  bio?: string | null;
  /**
   * Birthdate
   * @format date-time
   * @example "2000-12-22T07:16:45.261"
   */
  birthDate: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
            ? JSON.stringify(property)
            : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title COMP1640
 * @version v1
 * @license Education License
 * @contact COMP1640 <haottgcs210785@fpt.edu.vn>
 *
 * Web API for Collection application
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  authLoginCreate(arg0: { username: string; password: string; }) {
    throw new Error("Method not implemented.");
  }
  api = {
    /**
     * No description
     *
     * @tags Auth
     * @name AuthRegisterCreate
     * @summary Register new account
     * @request POST:/api/Auth/Register
     * @secure
     */
    authRegisterCreate: (data: RegisterRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Auth/Register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthLoginCreate
     * @summary Login to account
     * @request POST:/api/Auth/Login
     * @secure
     */
    authLoginCreate: (data: LoginRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Auth/Login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthVerifyEmailList
     * @summary Only for verify user email
     * @request GET:/api/Auth/VerifyEmail
     * @secure
     */
    authVerifyEmailList: (
      query?: {
        /** @format uuid */
        userId?: string;
        token?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Auth/VerifyEmail`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contribution
     * @name ContributionsCreate
     * @request POST:/api/contributions
     * @secure
     */
    contributionsCreate: (data: CreateContributionRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/contributions`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contribution
     * @name ContributionsList
     * @request GET:/api/contributions
     * @secure
     */
    contributionsList: (
      query?: {
        searchBy?: string;
        searchQuery?: string;
        orderBy?: string;
        /** @default true */
        isAscending?: boolean;
        /** @format uuid */
        facultyId?: string;
        /** @format uuid */
        userId?: string;
        /**
         * @format int32
         * @default 1
         */
        pageNumber?: number;
        /**
         * @format int32
         * @default 10
         */
        pageSize?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/contributions`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contribution
     * @name ContributionsDetail
     * @request GET:/api/contributions/{id}
     * @secure
     */
    contributionsDetail: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/contributions/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contribution
     * @name ContributionsUpdate
     * @request PUT:/api/contributions/{id}
     * @secure
     */
    contributionsUpdate: (id: string, data: UpdateContributionDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/contributions/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Contribution
     * @name ContributionsDelete
     * @request DELETE:/api/contributions/{id}
     * @secure
     */
    contributionsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/contributions/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Available fields for searchBy: - name Available fields for orderBy: - name - number of users
     *
     * @tags Faculty
     * @name FacultyList
     * @summary Get list of Facultys in system (Require ADMIN right to perform)
     * @request GET:/api/Faculty
     * @secure
     */
    facultyList: (
      query?: {
        searchBy?: string;
        searchQuery?: string;
        orderBy?: string;
        /** @default true */
        isAscending?: boolean;
        /**
         * @format int32
         * @min 1
         * @max 2147483647
         * @default 1
         */
        pageNumber?: number;
        /**
         * @format int32
         * @min 1
         * @max 2147483647
         * @default 10
         */
        pageSize?: number;
        /** @format uuid */
        userId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Faculty`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Faculty
     * @name FacultyCreate
     * @summary Create a new Faculty (Require ADMIN right to perform)
     * @request POST:/api/Faculty
     * @secure
     */
    facultyCreate: (data: CreateFacultyRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Faculty`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Faculty
     * @name FacultyDetail
     * @summary Get Faculty by Id (Require ADMIN right to perform)
     * @request GET:/api/Faculty/{id}
     * @secure
     */
    facultyDetail: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Faculty/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Faculty
     * @name FacultyUpdate
     * @summary Update an existing Faculty by Id (Require ADMIN right to perform)
     * @request PUT:/api/Faculty/{id}
     * @secure
     */
    facultyUpdate: (id: string, data: UpdateFacultyRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Faculty/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Faculty
     * @name FacultyDelete
     * @summary Delete the existing Faculty by Id (Require ADMIN right to perform)
     * @request DELETE:/api/Faculty/{id}
     * @secure
     */
    facultyDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Faculty/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Entering FacultyId and userId you want to assign Faculty for
     *
     * @tags Faculty
     * @name FacultyUsersCreate
     * @summary Assign Faculty to User (Require ADMIN right to perform)
     * @request POST:/api/Faculty/{facultyId}/users/{userId}
     * @secure
     */
    facultyUsersCreate: (facultyId: string, userId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Faculty/${facultyId}/users/${userId}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Entering userId and FacultyId you want to remove from user
     *
     * @tags Faculty
     * @name FacultyUsersDelete
     * @summary Remove User from Faculty (Require ADMIN right to perform
     * @request DELETE:/api/Faculty/{FacultyId}/users/{userId}
     * @secure
     */
    facultyUsersDelete: (facultyId: string, userId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Faculty/${facultyId}/users/${userId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags File
     * @name FileUploadFileCreate
     * @request POST:/api/File/UploadFile
     * @secure
     */
    fileUploadFileCreate: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, string>({
        path: `/api/File/UploadFile`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags File
     * @name FileDownloadFileList
     * @request GET:/api/File/DownloadFile
     * @secure
     */
    fileDownloadFileList: (
      query?: {
        filename?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/File/DownloadFile`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * @description Available fields for searchBy: - name Available fields for orderBy: - name - number of users
     *
     * @tags Roles
     * @name RolesList
     * @summary Get list of Roles in system (Require ADMIN right to perform)
     * @request GET:/api/Roles
     * @secure
     */
    rolesList: (
      query?: {
        searchBy?: string;
        searchQuery?: string;
        orderBy?: string;
        /** @default true */
        isAscending?: boolean;
        /**
         * @format int32
         * @min 1
         * @max 2147483647
         * @default 1
         */
        pageNumber?: number;
        /**
         * @format int32
         * @min 1
         * @max 2147483647
         * @default 10
         */
        pageSize?: number;
        /** @format uuid */
        userId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Roles`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesCreate
     * @summary Create a new Role (Require ADMIN right to perform)
     * @request POST:/api/Roles
     * @secure
     */
    rolesCreate: (data: CreateRoleRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Roles`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesDetail
     * @summary Get Role by Id (Require ADMIN right to perform)
     * @request GET:/api/Roles/{id}
     * @secure
     */
    rolesDetail: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Roles/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesUpdate
     * @summary Update an existing Role by Id (Require ADMIN right to perform)
     * @request PUT:/api/Roles/{id}
     * @secure
     */
    rolesUpdate: (id: string, data: UpdateRoleRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Roles/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Roles
     * @name RolesDelete
     * @summary Delete the existing Role by Id (Require ADMIN right to perform)
     * @request DELETE:/api/Roles/{id}
     * @secure
     */
    rolesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Roles/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Entering roleId and userId you want to assign role for
     *
     * @tags Roles
     * @name RolesUsersCreate
     * @summary Assign Role to User (Require ADMIN right to perform)
     * @request POST:/api/Roles/{roleId}/users/{userId}
     * @secure
     */
    rolesUsersCreate: (roleId: string, userId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Roles/${roleId}/users/${userId}`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * @description Entering userId and roleId you want to remove from user
     *
     * @tags Roles
     * @name RolesUsersDelete
     * @summary Remove User from Role (Require ADMIN right to perform
     * @request DELETE:/api/Roles/{roleId}/users/{userId}
     * @secure
     */
    rolesUsersDelete: (roleId: string, userId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Roles/${roleId}/users/${userId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Fields available for search: - username - firstname - lastname Fields available for order: - username - birthdate
     *
     * @tags Users
     * @name UsersList
     * @summary Get list of users (Require ADMIN right to perform)
     * @request GET:/api/Users
     * @secure
     */
    usersList: (
      query?: {
        searchBy?: string;
        searchQuery?: string;
        orderBy?: string;
        /** @default true */
        isAscending?: boolean;
        /**
         * @format int32
         * @min 1
         * @max 2147483647
         * @default 1
         */
        pageNumber?: number;
        /**
         * @format int32
         * @min 1
         * @max 2147483647
         * @default 10
         */
        pageSize?: number;
        /** @format uuid */
        roleId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/Users`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersCreate
     * @summary Create a new User (Require ADMIN right to perform)
     * @request POST:/api/Users
     * @secure
     */
    usersCreate: (data: CreateUserRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Users`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersDetail
     * @summary Get detail of User by Id (Require ADMIN right to perform)
     * @request GET:/api/Users/{id}
     * @secure
     */
    usersDetail: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Users/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersUpdate
     * @summary Update an existing User (Require ADMIN right to perform)
     * @request PUT:/api/Users/{id}
     * @secure
     */
    usersUpdate: (id: string, data: UpdateUserRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Users/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersDelete
     * @summary Delete an existing User (Require ADMIN right to perform)
     * @request DELETE:/api/Users/{id}
     * @secure
     */
    usersDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Users/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersSelfUpdate
     * @summary Update profile of current login User (Require login to perform)
     * @request PUT:/api/Users/self
     * @secure
     */
    usersSelfUpdate: (data: UpdateUserRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Users/self`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersChangePasswordUpdate
     * @request PUT:/api/Users/change-password
     * @secure
     */
    usersChangePasswordUpdate: (data: ChangePasswordRequestDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/Users/change-password`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
