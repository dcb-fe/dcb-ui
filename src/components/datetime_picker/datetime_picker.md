# DatetimePicker

## 基础渲染

<demo src="datetime_picker/basic" />

### 常见问题

#### 设置 minDate 或 maxDate 后出现页面卡死的情况？

```
请注意不要在模板中直接使用类似minDate="new Date()"的写法，这样会导致每次渲染组件时传入一个新的 Date 对象，
而传入新的数据会触发下一次渲染，从而陷入死循环。

正确的做法是将minDate作为一个数据定义在data函数中。
```

#### 在 iOS 系统上初始化组件失败？

```
如果你遇到了在 iOS 上无法渲染组件的问题，
请确认在创建 Date 对象时没有使用new Date('2021-01-01')这样的写法，
iOS 不支持以中划线分隔的日期格式，正确写法是new Date('2020/01/01')。
```

#### 是否有年份或月份选择器？

```
如果仅需要选择年份或者月份，建议直接使用 Picker 组件。
```

<api src="datetime_picker" />
