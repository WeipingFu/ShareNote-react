参照 Restful API 标准设计了以下接口：

凡是有/auth/的url都要利用token经过用户验证才能进行下一步操作

验证成功：赋值 req.username = username

验证失败：

若token不存在，返回 json{"error": "TOKEN_NOT_EXIST"};

若token中用户名与参数中的用户名不一致，返回 json{"error": "TOKEN_ERR"};

若token已经过期，返回 json{"error": "TOKEN_EXP"}

### 一、用户管理
**1. 用户登录**

请求url： /users/login

请求方法：POST

请求body：user {(username(必须), password(必须)}

返回参数：

  1) 成功：username, token(使用jwt)
  
     示例：json {"username": username, "token": token}
     
  2) 失败：错误信息
  
     示例： 若用户不存在，返回 json{"error": "USER_NOT_FOUND"};
     
     若密码不正确，返回 json{"error": "USER_NOT_FOUND"};
     
     其他错误，返回 json {"error": "GENERAL_ERROR"}
     
**2. 用户注册**

请求url： /users/register

请求方法：POST

请求body：user {username(必须,唯一), password(必须), email(可选，唯一)}

返回参数：

  1) 成功：username, token(使用jwt)
  
     示例：json {"username": username, "token": token}
     
  2) 失败：错误信息
  
     示例： 若用户名被占，返回 json{"error": "USERNAME_TAKEN"};
     
     若邮箱已注册，返回 json{"error": "EMAIL_TAKEN"};
     
     其他错误，返回 json {"error": "GENERAL_ERROR"}

**3. 用户登出**

请求url： /auth/users/logout/:username

请求方法：POST

请求头："x-access-token": localStorage.getItem('token')

返回参数：

  1）成功：success
  
     示例：json {"success": 'LOGOUT_SUCCESS'}
     
  2) 失败：失败信息
     
**4. 查看用户信息**

请求url： /auth/users/:username

请求方法：GET

请求头："x-access-token": localStorage.getItem('token')

返回参数：

  1）成功：user对象
  
     示例：json {"user": user}
  
**5. 修改用户信息**

请求url： /auth/users/:username

请求方法：PUT

请求body：newUser对象（要修改的信息）

请求头："x-access-token": localStorage.getItem('token')

返回参数：

  1）成功：success
  
     示例：json {"success": "USER_UPDATE_SUCCESS"}

**6. 查看用户评论**

请求url： /auth/comments/:username

请求方法：GET

请求头："x-access-token": localStorage.getItem('token')

返回参数：

  1）成功：用户所有的评论内容
  
     示例：json {"comments": comments}
     
  2) 失败：失败信息

**7. 查看用户消息**

请求url： /auth/messages/:username

请求方法：GET

请求头："x-access-token": localStorage.getItem('token')

返回参数：

  1）成功：用户接收到的所有消息
  
     示例：json {"messages": messages}
     
  2) 失败：失败信息
  
### 二、笔记管理

**1. 用户查看自己的所有笔记**

请求url： /auth/notes/:username

请求方法：GET

请求头："x-access-token": localStorage.getItem('token')

返回参数：

  1）成功：该用户所有的note
  
     示例：json {"notes": notes}
     
  2) 失败：失败信息

**2. 添加笔记**

请求url： /auth/notes/:username

请求方法：POST

请求body：note {title(必须,唯一), content(必须), tags, notebook, category, isPublishing}

请求头："x-access-token": localStorage.getItem('token')

返回参数：
  1）成功：success
  
     示例：json {"success": "ADD_NOTE_SUCCESS"}
     
  2) 失败：
  若笔记标题重复，返回 json {"error": "NOTE_EXIST"};
  
  其他错误， 返回 json {"error": "ADD_NOTE_ERROR"}

**3. 修改笔记**

请求url： /auth/notes/:username/:note_id

请求方法：PUT

请求body：newNote {title(必须,唯一), content(必须), tags, notebook, category, isPublishing}

请求头："x-access-token": localStorage.getItem('token')

返回参数：

  1）成功：success
  
     示例：json {"success": "UPDATE_NOTE_SUCCESS"}
     
  2) 失败：
  若修改后的笔记标题和已存在的某个其他笔记一样，返回 json {"error": "NOTE_TITLE_EXIST"};
  
  若指定笔记不存在，返回 json {"error": "NOTE_NOT_EXIST"};
           
  其他错误， 返回 json {"error": "UPDATE_NOTE_ERROR"}

**4. 删除单个笔记**

请求url： /auth/notes/:username/:note_id

请求方法：DELETE

请求头："x-access-token": localStorage.getItem('token')

返回参数：

  1）成功：success
  
     示例：json {"success": "DELETE_NOTE_SUCCESS"}
     
  2) 失败：
  若指定笔记不存在，返回 json {"error": "NOTE_NOT_EXIST"};
  
  其他错误， 返回 json {"error": "DELETE_NOTE_ERROR"}
           
**5. 按条件删除用户的笔记**

请求url： /auth/notes/:username

请求方法：DELETE

请求参数：url参数 （查询条件）

请求头："x-access-token": localStorage.getItem('token')

返回参数：

  1）成功：success
  
     示例：json {"success": "DELETE_NOTE_SUCCESS"}
     
  2) 失败：
  若指定笔记不存在，返回 json {"error": "NOTE_NOT_EXIST"};
  
  其他错误， 返回 json {"error": "DELETE_NOTE_ERROR"}
           
**6. 按条件查看指定用户的笔记** 

请求url： /auth/notes/:username

请求方法：GET

请求参数：url参数（query）

请求头："x-access-token": localStorage.getItem('token')

返回参数：

  1）成功：笔记集合
  
     示例：json {"notes": notes}
     
  2) 失败：失败信息
  
**7. 查看用户收藏的笔记**

请求url： /auth/notes/collection/:username

请求方法：GET

请求头："x-access-token": localStorage.getItem('token')

返回参数：

  1）成功：笔记集合
  
     示例：json {"notes": notes}
     
  2) 失败：失败信息
           
**8. 按条件查看所有用户的笔记**

请求url： /notes

请求方法：GET

请求参数：url参数


返回参数：
  1）成功：笔记集合
  
     示例：json {"notes": notes}
     
  2) 失败：失败信息
  
### 三、笔记本相关

**1. 获取用户所有的笔记本**

请求url： /auth/notebooks/:username

请求方法：GET

请求头："x-access-token": localStorage.getItem('token')

返回参数：

  1）成功：笔记本集合
  
     示例：json {"notebooks": notebooks}
     
  2) 失败：失败信息
  
**2. 添加笔记本**

请求url： /auth/notebooks/:username

请求方法：POST

请求参数：json{"bookname": bookname, "info": info, "user": user}

请求头："x-access-token": localStorage.getItem('token')

返回参数：

  1）成功：成功信息
  
     示例：json {"success": 'ADD_NOTEBOOK_SUCCESS'}
     
  2) 失败：失败信息

### 四、评论相关

**1. 获取笔记评论**

请求url： /comments/:note_id

请求方法：GET

返回参数：

  1）成功：评论对象的集合
  
     示例：json {"comments": comments}
     
  2) 失败：失败信息
  
**2. 添加评论**

请求url： /auth/comments/:username

请求方法：POST

请求参数：json{"content": content, "user": user, "entity_id": entity_id, "entity_type": entity_type, "to_user_id": to_user_id}

请求头："x-access-token": localStorage.getItem('token')

返回参数：

  1）成功：成功信息
  
     示例：json {"success": ‘ADD_COMMENT_SUCCESS’}
     
  2) 失败：失败信息
  
