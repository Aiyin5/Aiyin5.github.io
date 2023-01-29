const n=JSON.parse('{"key":"v-14579120","path":"/zh/posts/%E5%85%B3%E4%BA%8E%E6%8A%80%E6%9C%AF/LeetCode%E9%A2%98%E8%A7%A3/1664%E7%94%9F%E6%88%90%E5%B9%B3%E8%A1%A1%E6%95%B0%E7%BB%84%E7%9A%84%E6%96%B9%E6%A1%88%E6%95%B0.html","title":"1664. 生成平衡数组的方案数","lang":"zh-CN","frontmatter":{"icon":"page","date":"2023-01-29T00:00:00.000Z","category":["LeetCode"],"tag":["题解"],"description":"1664. 生成平衡数组的方案数 题目描述 给你一个整数数组&nbsp;nums&nbsp;。你需要选择&nbsp;恰好&nbsp;一个下标（下标从&nbsp;0&nbsp;开始）并删除对应的元素。请注意剩下元素的下标可能会因为删除操作而发生改变。 比方说，如果&nbsp;nums = [6,1,7,4,1]&nbsp;，那么： 选择删除下标&nbsp;1&nbsp;，剩下的数组为&nbsp;nums = [6,7,4,1]&nbsp;。 选择删除下标&nbsp;2&nbsp;，剩下的数组为&nbsp;nums = [6,1,4,1]&nbsp;。 选择删除下标&nbsp;4&nbsp;，剩下的数组为&nbsp;nums = [6,1,7,4]&nbsp;。","head":[["meta",{"property":"og:url","content":"https://aiyin5.github.io/zh/posts/%E5%85%B3%E4%BA%8E%E6%8A%80%E6%9C%AF/LeetCode%E9%A2%98%E8%A7%A3/1664%E7%94%9F%E6%88%90%E5%B9%B3%E8%A1%A1%E6%95%B0%E7%BB%84%E7%9A%84%E6%96%B9%E6%A1%88%E6%95%B0.html"}],["meta",{"property":"og:site_name","content":"艾因的博客"}],["meta",{"property":"og:title","content":"1664. 生成平衡数组的方案数"}],["meta",{"property":"og:description","content":"1664. 生成平衡数组的方案数 题目描述 给你一个整数数组&nbsp;nums&nbsp;。你需要选择&nbsp;恰好&nbsp;一个下标（下标从&nbsp;0&nbsp;开始）并删除对应的元素。请注意剩下元素的下标可能会因为删除操作而发生改变。 比方说，如果&nbsp;nums = [6,1,7,4,1]&nbsp;，那么： 选择删除下标&nbsp;1&nbsp;，剩下的数组为&nbsp;nums = [6,7,4,1]&nbsp;。 选择删除下标&nbsp;2&nbsp;，剩下的数组为&nbsp;nums = [6,1,4,1]&nbsp;。 选择删除下标&nbsp;4&nbsp;，剩下的数组为&nbsp;nums = [6,1,7,4]&nbsp;。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:updated_time","content":"2023-01-29T08:15:06.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"article:tag","content":"题解"}],["meta",{"property":"article:published_time","content":"2023-01-29T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-01-29T08:15:06.000Z"}]]},"headers":[{"level":2,"title":"题目描述","slug":"题目描述","link":"#题目描述","children":[]},{"level":2,"title":"思路","slug":"思路","link":"#思路","children":[]},{"level":2,"title":"题解","slug":"题解","link":"#题解","children":[]}],"git":{"createdTime":1674980106000,"updatedTime":1674980106000,"contributors":[{"name":"aiyin","email":"372020407@qq.com","commits":1}]},"readingTime":{"minutes":2.94,"words":883},"filePathRelative":"zh/posts/关于技术/LeetCode题解/1664生成平衡数组的方案数.md","localizedDate":"2023年1月29日","excerpt":"<h1> 1664. 生成平衡数组的方案数</h1>\\n<h2> 题目描述</h2>\\n<p>给你一个整数数组&nbsp;<code>nums</code>&nbsp;。你需要选择&nbsp;<strong>恰好</strong>&nbsp;一个下标（下标从&nbsp;<strong>0</strong>&nbsp;开始）并删除对应的元素。请注意剩下元素的下标可能会因为删除操作而发生改变。</p>\\n<p>比方说，如果&nbsp;<code>nums = [6,1,7,4,1]</code>&nbsp;，那么：</p>\\n<ul>\\n<li>选择删除下标&nbsp;<code>1</code>&nbsp;，剩下的数组为&nbsp;<code>nums = [6,7,4,1]</code>&nbsp;。</li>\\n<li>选择删除下标&nbsp;<code>2</code>&nbsp;，剩下的数组为&nbsp;<code>nums = [6,1,4,1]</code>&nbsp;。</li>\\n<li>选择删除下标&nbsp;<code>4</code>&nbsp;，剩下的数组为&nbsp;<code>nums = [6,1,7,4]</code>&nbsp;。</li>\\n</ul>","autoDesc":true}');export{n as data};
