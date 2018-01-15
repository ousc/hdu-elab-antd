import {Injectable} from '@angular/core';
import {NHttpClinet} from '@core/utils/http.client';
import {TableFiled} from '@core/interfaces/table.interface';
import {BaseService} from '@core/utils/BaseRequest';
import {reject} from "q";

@Injectable()
export class UserService extends BaseService {

  constructor(http: NHttpClinet) {
    super('user', http);
  }

  /**
   * 获取列表表头
   * @returns {TableFiled[]}
   */
  getTableHeader(): TableFiled[] {
    return [
      {
        field: 'id',
        text: 'Id'
      },
      {
        field: 'avatar',
        text: 'Avatar',
        type: 3
      },
      {
        field: 'name',
        text: 'Name'
      },
      {
        field: 'nickName',
        text: 'NickName'
      },
      {
        field: 'phone',
        text: 'Phone'
      },
      {
        field: 'age',
        text: 'Age'
      },
      {
        field: 'address',
        text: 'Address'
      },
      {
        field: 'isMale',
        text: 'IsMale',
        type: 4
      },
      {
        field: 'email',
        text: 'Email'
      },
      {
        field: 'createTime',
        text: 'CreateTime'
      },
      {
        text: '操作',
        type: 2
      }
    ]
      ;
  }

  /**
   * 获取列表数据
   * @param pageIndex
   * @param pageSize
   * @returns {Promise<any>}
   */
  getUserList(pageIndex, pageSize) {
    const data = {
      data:[
        {
          "id": "230000198305256381",
          "name": "Shirley Lopez",
          "nickName": "Thompson",
          "phone": "14624246428",
          "age": 77,
          "address": "西藏自治区 山南地区 隆子县",
          "isMale": false,
          "email": "j.wzbmlb@tmnw.eg",
          "createTime": "2003-06-01 17:13:06",
          "avatar": "http://dummyimage.com/100x100/b9f279/757575.png&text=T"
        },
        {
          "id": "810000197810304376",
          "name": "Linda Miller",
          "nickName": "Gonzalez",
          "phone": "13728936829",
          "age": 87,
          "address": "台湾 屏东县 新园乡",
          "isMale": true,
          "email": "z.djommw@qovg.tv",
          "createTime": "1984-11-16 14:08:59",
          "avatar": "http://dummyimage.com/100x100/f279dd/757575.png&text=G"
        },
        {
          "id": "810000200808080419",
          "name": "Mary Harris",
          "nickName": "Harris",
          "phone": "17340883191",
          "age": 82,
          "address": "山西省 朔州市 怀仁县",
          "isMale": false,
          "email": "f.jnilodikwy@njf.qa",
          "createTime": "1981-07-11 16:53:14",
          "avatar": "http://dummyimage.com/100x100/79f2e3/757575.png&text=H"
        },
        {
          "id": "810000198312056749",
          "name": "Patricia Thompson",
          "nickName": "Taylor",
          "phone": "15643667608",
          "age": 61,
          "address": "山东省 淄博市 临淄区",
          "isMale": true,
          "email": "c.lotkjba@mukcuupxmx.lb",
          "createTime": "1982-01-27 08:40:24",
          "avatar": "http://dummyimage.com/100x100/f2c079/757575.png&text=T"
        },
        {
          "id": "130000198009058897",
          "name": "Maria Lee",
          "nickName": "Lee",
          "phone": "15187680827",
          "age": 86,
          "address": "河北省 邯郸市 涉县",
          "isMale": true,
          "email": "y.vugiylqq@dkwnbyr.tr",
          "createTime": "1995-04-14 01:07:58",
          "avatar": "http://dummyimage.com/100x100/9d79f2/757575.png&text=L"
        },
        {
          "id": "420000198409206501",
          "name": "Mary Perez",
          "nickName": "Brown",
          "phone": "15531456644",
          "age": 93,
          "address": "青海省 黄南藏族自治州 河南蒙古族自治县",
          "isMale": true,
          "email": "w.fwgp@ddxqd.an",
          "createTime": "1975-09-19 07:17:17",
          "avatar": "http://dummyimage.com/100x100/79f279/757575.png&text=B"
        },
        {
          "id": "820000200001181421",
          "name": "Brenda Lewis",
          "nickName": "Robinson",
          "phone": "15336059574",
          "age": 20,
          "address": "澳门特别行政区 澳门半岛 -",
          "isMale": true,
          "email": "n.tlsjgg@rdsvluxfdy.tz",
          "createTime": "1976-10-16 18:56:38",
          "avatar": "http://dummyimage.com/100x100/f2799b/757575.png&text=R"
        },
        {
          "id": "140000198605033831",
          "name": "Kevin Perez",
          "nickName": "Johnson",
          "phone": "17956222563",
          "age": 77,
          "address": "新疆维吾尔自治区 吐鲁番地区 吐鲁番市",
          "isMale": true,
          "email": "d.pemd@dlywnzd.sr",
          "createTime": "2015-09-01 01:41:34",
          "avatar": "http://dummyimage.com/100x100/79bef2/757575.png&text=J"
        },
        {
          "id": "990000199310173821",
          "name": "Jennifer Wilson",
          "nickName": "Gonzalez",
          "phone": "14764132850",
          "age": 21,
          "address": "台湾 云林县 土库镇",
          "isMale": true,
          "email": "d.kacxwligh@andrcyzd.id",
          "createTime": "1993-08-13 02:04:55",
          "avatar": "http://dummyimage.com/100x100/e2f279/757575.png&text=G"
        },
        {
          "id": "360000201306221192",
          "name": "Jeffrey Perez",
          "nickName": "Thompson",
          "phone": "17413752555",
          "age": 23,
          "address": "天津 天津市 东丽区",
          "isMale": false,
          "email": "i.jsrm@xlbsqutb.tv",
          "createTime": "2016-12-06 02:38:37",
          "avatar": "http://dummyimage.com/100x100/de79f2/757575.png&text=T"
        }
      ],
      total: 80,
    };
      return new Promise((resolve, reject) =>{
        return resolve(data);
      });
    // return new Promise((resolve, reject) => {
    //   this.http.get('http://www.easy-mock.com/mock/5a011b579d3ceb4a354379db/user')
    //     .subscribe(result => {
    //       resolve(result);
    //     });
    // });
  }

  getCityData() {
    return [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake',
          isLeaf: true
        }],
      }, {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
      }],
    }, {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
          value: 'zhonghuamen',
          label: 'Zhong Hua Men',
          isLeaf: true
        }],
      }],
    }];
  }
}
