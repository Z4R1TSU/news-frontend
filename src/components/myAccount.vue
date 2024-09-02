<template>
  <div class="text-start p-4 shadow mb-2">
    <h2>我的账户</h2>
    <hr />
    <div class="row">
      <div class="col-12 col-lg-5 text-center mb-2">
        <div class="card bg-warning text-white" style="height: 100%">
          <div class="card-header">以太坊账户</div>
          <div class="card-body" style="font-size: 1.2rem">
            <div v-if="isAccountLogin">
              <!-- <p>{{ account }} ecny</p> -->
              <p>账户地址：{{ accountAddress }}</p>
            </div>
            <div v-if="!isAccountLogin">
              <p>&nbsp;</p>
            </div>
          </div>
          <div class="card-footer">
            <el-popover
              placement="bottom"
              :width="200"
              trigger="click"
              content="1.添加代币 2.填写合约地址 3.填写ecny代币名称"
            >
              <template #reference>
                <button type="button" class="btn text-white">步骤</button>
              </template>
            </el-popover>
            <el-popover
              placement="bottom"
              :width="200"
              trigger="click"
              content="0xbcfFB44e2d586236739E483e15AA453C661b29B2"
            >
              <template #reference>
                <button type="button" class="btn text-white">合约地址</button>
              </template>
            </el-popover>
            <!-- <text class="text-white">
              合约地址：0xbcfFB44e2d586236739E483e15AA453C661b29B2
            </text> -->
            <button
              v-if="isAccountLogin"
              @click="signOut()"
              type="button"
              class="btn text-white"
            >
              切换
            </button>
            <button
              v-if="!isAccountLogin"
              @click="login()"
              type="button"
              class="btn text-white"
            >
              登录
            </button>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-7 mb-2">
        <div class="card bg-info text-white">
          <div class="card-body row">
            <div class="col-6 col-lg-6">
              <p>浏览时长：{{ Math.floor(browsingTime) }}分</p>
              <p style="font-size: 0.9rem">{{ ethPerMinute }} 分/1ecny</p>
              <button
                class="btn btn-info text-white"
                @click="openTime()"
                type="button"
              >
                兑换
              </button>
              <!-- 对话框 -->
            </div>
            <div class="col-6 col-lg-6 mb-2">
              <p>邀请人数：{{ invites }}人</p>
              <p style="font-size: 0.9rem">{{ ethPerInvite }} 人/1ecny</p>
              <button
                class="btn btn-info text-white"
                @click="openNumber()"
                type="button"
              >
                兑换
              </button>
            </div>
            <div>
              <p>
                <span>我的邀请码：{{ myInvitNumber }}</span>
              </p>
              <div
                class="input-group input-group-lg input-group-sm"
                v-if="!userActive.isInvited"
              >
                <span>填写邀请码：</span>
                <input
                  type="text"
                  class="form-control form-control-sm me-2"
                  v-model="invitNumber"
                  style="max-width: 11rem"
                />
                <span class="input-group-btn">
                  <button
                    class="btn btn-info text-white"
                    type="button"
                    @click="addInvit()"
                  >
                    确认
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 兑换记录 -->
    <div>
      <hr />
      <h5>兑换记录</h5>
      <div
        class="scroll-container1"
        ref="tableContainer"
        @scroll="handleScroll()"
      >
        <table class="table table-striped">
          <thead>
            <tr>
              <th>值</th>
              <th>代币值</th>
              <th>地址</th>
              <th>状态</th>
              <th>时间</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in exchangeList" :key="key">
              <td v-if="item.changeType == 'lookTime'">
                {{ item.changeValue }}分
              </td>
              <td v-if="item.changeType == 'invitedNum'">
                {{ item.changeValue }}人
              </td>
              <td>{{ item.changeEcny }} ency</td>
              <td>{{ item.address }}</td>
              <td v-if="item.state == 0">申请中</td>
              <td v-else-if="item.state == 1">已通过</td>
              <td v-else-if="item.state == 2">不通过</td>
              <td>{{ formatTime(item.time) }}</td>
            </tr>
          </tbody>
        </table>
        <div v-if="isLoading" class="loading"></div>
      </div>
    </div>
    <!-- 对话框 -->
    <el-dialog
      v-model="timeVisiable"
      title="兑换"
      width="49vh"
      center
      align-center
    >
      <p class="text-center">浏览时长：{{ browsingTimeValue }}分</p>
      <p class="text-center">兑换ecny值：{{ ecnyValue }}</p>
      <p class="text-center">地址：{{ accountAddress }}</p>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="timeVisiable = false">取消</el-button>
          <el-button type="primary" @click="timeExchange()"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog
      v-model="numberVisible"
      title="兑换"
      width="49vh"
      center
      align-center
    >
      <p class="text-center">邀请人数：{{ invitesValue }}人</p>
      <p class="text-center">兑换ecny值：{{ ecnyValue }}</p>
      <p class="text-center">地址：{{ accountAddress }}</p>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="numberVisible = false">取消</el-button>
          <el-button type="primary" @click="numberExchange()"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
//import { ethers } from "ethers";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";
export default {
  name: "myInfo-Vue",
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const isAccountLogin = ref(false);
    const isLoading = ref(true);
    const account = ref(123232.0);
    const tableContainer = ref(null);

    const browsingTimeValue = ref();
    const invitesValue = ref();
    const ecnyValue = ref();

    const invitNumber = ref();
    const myInvitNumber = ref();
    const timeVisiable = ref(false);
    const numberVisible = ref(false);
    const userActive = computed(() => store.getters["UserAccount/userActive"]);
    const exchangeList = computed(
      () => store.getters["UserAccount/exchangeList"]
    );
    const pages = computed(() => store.getters["UserAccount/totalPages"]);
    const currentPage = computed(
      () => store.getters["UserAccount/currentPage"]
    );
    const accountAddress = ref();
    //账户地址
    //const address = ref();
    const browsingTime = computed(
      () => store.getters["UserAccount/browsingTime"]
    ); // in minutes
    const invites = computed(() => store.getters["UserAccount/invites"]); // number of invites sent
    const ethPerMinute = computed(
      () => store.getters["UserAccount/lookTimeValue"]
    ); // ETH earned per minute of browsing
    const ethPerInvite = computed(
      () => store.getters["UserAccount/inviteNumberValue"]
    ); // ETH earned per invite
    const login = () => {
      // isAccountLogin.value = true;
      // console.log(isAccountLogin.value);
      connectWallet();
    };
    const signOut = () => {
      connectWallet();
    };
    const handleScroll = () => {
      if (
        tableContainer.value.scrollHeight - tableContainer.value.scrollTop ===
        tableContainer.value.clientHeight
      ) {
        if (currentPage.value >= pages.value) {
          isLoading.value = false;
        } else {
          const user = sessionStorage.getItem("user");
          if (user !== null) {
            myInvitNumber.value = JSON.parse(user).userId;
            store.dispatch("UserAccount/getUserExchangeList", {
              page: currentPage.value + 1,
              userId: JSON.parse(user).userId,
            });
          }
        }
      }
    };
    const formatTime = (time) => {
      if (time !== null) {
        const timestamp = time;
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // 月份从0开始，需要加1
        const day = String(date.getUTCDate()).padStart(2, "0");
        const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");
        const seconds = String(date.getUTCSeconds()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
      } else {
        return;
      }
    };
    const addInvit = () => {
      //判断改邀请码是否有效
      const user = sessionStorage.getItem("user");
      if (
        invitNumber.value >= 66667 &&
        invitNumber.value < JSON.parse(user).userId
      ) {
        if (user) {
          store.dispatch("UserAccount/addInvite", {
            userId: JSON.parse(user).userId,
            inviterId: invitNumber.value,
          });
        }
      } else {
        ElMessage({
          type: "warning",
          message: "无效邀请码",
        });
      }
    };
    const init = () => {
      const user = sessionStorage.getItem("user");
      if (user !== null) {
        myInvitNumber.value = JSON.parse(user).userId;
        store.dispatch("UserAccount/getUserExchangeList", {
          page: 1,
          userId: JSON.parse(user).userId,
        });
      } else {
        router.push({ path: "/home1" });
      }
    };
    const timeExchange = () => {
      const user = sessionStorage.getItem("user");
      if (user) {
        store.dispatch("UserAccount/addExchange", {
          userId: JSON.parse(user).userId,
          changeType: "lookTime",
          changeValue: browsingTimeValue.value,
          changeEcny: ecnyValue.value,
          address: accountAddress.value,
        });
        setTimeout(() => {
          timeVisiable.value = false;
          init();
        }, 500);
      }
      console.log(1234123435);
    };
    const numberExchange = () => {
      const user = sessionStorage.getItem("user");
      if (user) {
        store.dispatch("UserAccount/addExchange", {
          userId: JSON.parse(user).userId,
          changeType: "invitedNum",
          changeValue: invitesValue.value,
          changeEcny: ecnyValue.value,
          address: accountAddress.value,
        });
        setTimeout(() => {
          numberVisible.value = false;
          init();
        }, 500);
      }
    };
    const openTime = () => {
      if (Math.floor(browsingTime.value)) {
        if (accountAddress.value) {
          browsingTimeValue.value = Math.floor(browsingTime.value);
          ecnyValue.value = (
            browsingTimeValue.value / ethPerMinute.value
          ).toFixed(17);
          timeVisiable.value = true;
        } else {
          ElMessage({
            type: "info",
            message: "请登录MetaMask！",
          });
        }
      } else {
        ElMessage({
          type: "info",
          message: "时长不足",
        });
      }
    };
    const openNumber = () => {
      if (invites.value) {
        if (accountAddress.value) {
          invitesValue.value = invites.value;
          ecnyValue.value = (invitesValue.value / ethPerInvite.value).toFixed(
            17
          );
          numberVisible.value = true;
        } else {
          ElMessage({
            type: "info",
            message: "请登录MetaMask！",
          });
        }
      } else {
        ElMessage({
          type: "info",
          message: "人数不足",
        });
      }
    };
    //连接钱包
    const connectWallet = async () => {
      try {
        // 检查 MetaMask 是否安装
        if (typeof window.ethereum !== "undefined") {
          // 请求连接 MetaMask
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          // 获取第一个账户（默认账户）
          accountAddress.value = accounts[0];
          isAccountLogin.value = true;
          // 创建一个 provider 实例
          //const provider = new ethers.providers.Web3Provider(window.ethereum);
          //const signer = provider.getSigner();

          // 创建一个 provider 实例
          //const provider = new ethers.providers.Web3Provider(window.ethereum);

          // 请求授权连接账户
          // await provider.send("eth_requestAccounts", []);

          // 获取当前签名者（使用中的账户）
          //const signer = provider.getSigner();

          // 获取地址
          //accountAddress.value = await signer.getAddress();

          // 你可以在这里使用 signer 和 provider 来与智能合约交互
        } else {
          alert("请安装 MetaMask!");
        }
      } catch (error) {
        console.error("连接钱包时出错:", error);
      }
    };
    onMounted(() => {
      connectWallet();
      init();
      store.dispatch("UserAccount/getExchangeRatio");
    });
    return {
      account,
      browsingTime,
      myInvitNumber,
      invites,
      invitNumber,
      userActive,
      accountAddress,
      ethPerMinute,
      ethPerInvite,
      timeVisiable,
      numberVisible,
      isAccountLogin,
      exchangeList,
      tableContainer,
      browsingTimeValue,
      invitesValue,
      ecnyValue,
      addInvit,
      login,
      openNumber,
      openTime,
      timeExchange,
      numberExchange,
      signOut,
      isLoading,
      handleScroll,
      formatTime,
    };
  },
};
</script>

<style>
.bg-transparent-51 {
  color: white;
  background-color: rgba(61, 77, 141, 0.936); /* 红色背景透明度为50% */
}
.scroll-container1 {
  overflow: auto;
  max-height: 100vh;
  /* height: 100px;  */
  /* For large screens, height should be 100vh */
  /* For small screens, width should be 100vw */
}
</style>
