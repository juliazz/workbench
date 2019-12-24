## #Git work flow#
[<<<<文档链接>>>>](https://github.com/xirong/my-git/blob/master/git-workflow-tutorial.md)

* branch 规范
  * `master:` 生产环境分支
  * `uat:` 生产环境分支
  * `dev:` 开发环境分支
  * `feature/{{品牌名}}-{{ticketId}}:` 功能需求分支，`ticketId` 指TB任务Id
  * `hotfix/{{ticketId}}:` 线上需求/bug分支（从master分支创建），`ticketId` 指TB任务Id

* commit 规范
  * A 新增xxx
  * F 修复xxx
  * U 更新xxx
  * M 合并xxx

* release 规范
  * release-v1.0.0(版本和小程序上传版本一致);
  * release 需备注发布详细描述
