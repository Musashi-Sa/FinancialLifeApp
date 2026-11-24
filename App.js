import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';

const translations = {
  en: {
    title: 'Financial Life Manager',
    subtitle: 'Track your income, expenses and budget',
    balance: 'Total Balance',
    income: 'Income',
    expense: 'Expenses',
    addTransaction: 'Add Transaction',
    descPlaceholder: 'Description (e.g. Salary, Rent)',
    amountPlaceholder: 'Amount ($)',
    typeIncome: 'Income',
    typeExpense: 'Expense',
    save: 'Save',
    history: 'Transaction History',
    noTransactions: 'No transactions yet',
  },
  fr: {
    title: 'Gestionnaire Financier',
    subtitle: 'Suivez vos revenus, dépenses et budget',
    balance: 'Solde Total',
    income: 'Revenus',
    expense: 'Dépenses',
    addTransaction: 'Ajouter une transaction',
    descPlaceholder: 'Description (ex. Salaire, Loyer)',
    amountPlaceholder: 'Montant ($)',
    typeIncome: 'Revenu',
    typeExpense: 'Dépense',
    save: 'Enregistrer',
    history: 'Historique des transactions',
    noTransactions: 'Aucune transaction pour le moment',
  },
  ar: {
    title: 'ةيلاملا ةايحلا ريدم',
    subtitle: 'ةلوهسب كتينازيمو كفيراصمو كلخد عبتت',
    balance: 'يلامجإلا ديصرلا',
    income: 'لخدلا',
    expense: 'فيراصملا',
    addTransaction: 'ةديدج ةلماعم ةفاضإ',
    descPlaceholder: ')راجيإ ،بتار :لثم( فصولا',
    amountPlaceholder: 'غلبملا ($)',
    typeIncome: 'لخد',
    typeExpense: 'فرص',
    save: 'ظفح',
    history: 'تالماعملا لجس',
    noTransactions: 'نآلا ىتح تالماعم دجوت ال',
  }
};

export default function App() {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const [balance, setBalance] = useState(1250);
  const [totalIncome, setTotalIncome] = useState(2000);
  const [totalExpense, setTotalExpense] = useState(750);
  const [transactions, setTransactions] = useState([
    { id: '1', desc: lang === 'ar' ? 'بتار' : lang === 'fr' ? 'Salaire' : 'Salary', amount: 2000, type: 'income' },
    { id: '2', desc: lang === 'ar' ? 'راجيإ' : lang === 'fr' ? 'Loyer' : 'Rent', amount: -750, type: 'expense' },
  ]);

  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');

  const addTx = () => {
    if (!desc || !amount) return;
    const num = parseFloat(amount);
    const finalAmount = type === 'expense' ? -Math.abs(num) : Math.abs(num);
    const newTx = {
      id: Date.now().toString(),
      desc,
      amount: finalAmount,
      type
    };

    setTransactions([newTx, ...transactions]);
    const newBalance = balance + finalAmount;
    setBalance(newBalance);
    if (type === 'income') {
      setTotalIncome(totalIncome + Math.abs(num));
    } else {
      setTotalExpense(totalExpense + Math.abs(num));
    }
    setDesc('');
    setAmount('');
  };

  const isRtl = lang === 'ar';

  return (
    <ScrollView style={[styles.container, isRtl && styles.rtlContainer]}>
      <View style={styles.langRow}>
        <TouchableOpacity onPress={() => setLang('en')} style={[styles.langBtn, lang === 'en' && styles.activeLang]}>
          <Text style={styles.langText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLang('fr')} style={[styles.langBtn, lang === 'fr' && styles.activeLang]}>
          <Text style={styles.langText}>Français</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLang('ar')} style={[styles.langBtn, lang === 'ar' && styles.activeLang]}>
          <Text style={styles.langText}>ةيبرعلا</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{t.title}</Text>
      <Text style={styles.subtitle}>{t.subtitle}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t.balance}</Text>
        <Text style={styles.balanceText}>${balance.toFixed(2)}</Text>
        <View style={styles.row}>
          <View>
            <Text style={styles.subLabel}>{t.income}</Text>
            <Text style={styles.incomeText}>+${totalIncome.toFixed(2)}</Text>
          </View>
          <View>
            <Text style={styles.subLabel}>{t.expense}</Text>
            <Text style={styles.expenseText}>-${totalExpense.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>{t.addTransaction}</Text>
        <TextInput
          style={[styles.input, isRtl && styles.rtlInput]}
          placeholder={t.descPlaceholder}
          placeholderTextColor="#888"
          value={desc}
          onChangeText={setDesc}
        />
        <TextInput
          style={[styles.input, isRtl && styles.rtlInput]}
          placeholder={t.amountPlaceholder}
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <View style={styles.typeRow}>
          <TouchableOpacity
            style={[styles.typeBtn, type === 'income' && styles.incomeActive]}
            onPress={() => setType('income')}
          >
            <Text style={styles.typeText}>{t.typeIncome}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeBtn, type === 'expense' && styles.expenseActive]}
            onPress={() => setType('expense')}
          >
            <Text style={styles.typeText}>{t.typeExpense}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.saveBtn} onPress={addTx}>
          <Text style={styles.saveBtnText}>{t.save}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.historyCard}>
        <Text style={styles.formTitle}>{t.history}</Text>
        {transactions.length === 0 ? (
          <Text style={styles.noTxText}>{t.noTransactions}</Text>
        ) : (
          transactions.map(item => (
            <View key={item.id} style={styles.txItem}>
              <Text style={styles.txDesc}>{item.desc}</Text>
              <Text style={[styles.txAmount, item.amount > 0 ? styles.incAmt : styles.expAmt]}>
                {item.amount > 0 ? `+${item.amount}` : item.amount} $
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20, paddingTop: 50 },
  rtlContainer: { direction: 'rtl' },
  langRow: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20, gap: 10 },
  langBtn: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#1e293b', borderRadius: 8, borderWidth: 1, borderColor: '#334155' },
  activeLang: { backgroundColor: '#3b82f6', borderColor: '#60a5fa' },
  langText: { color: '#fff', fontWeight: '600' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#f8fafc', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#94a3b8', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#334155' },
  cardTitle: { color: '#94a3b8', fontSize: 14 },
  balanceText: { color: '#f8fafc', fontSize: 32, fontWeight: 'bold', marginVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  subLabel: { color: '#94a3b8', fontSize: 12 },
  incomeText: { color: '#4ade80', fontSize: 16, fontWeight: 'bold' },
  expenseText: { color: '#f87171', fontSize: 16, fontWeight: 'bold' },
  formCard: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: '#334155' },
  formTitle: { color: '#f8fafc', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  input: { backgroundColor: '#0f172a', borderWidth: 1, borderColor: '#334155', borderRadius: 8, padding: 12, color: '#fff', marginBottom: 12 },
  rtlInput: { textAlign: 'right' },
  typeRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  typeBtn: { flex: 1, padding: 10, borderRadius: 8, backgroundColor: '#0f172a', alignItems: 'center', borderWidth: 1, borderColor: '#334155' },
  incomeActive: { backgroundColor: '#065f46', borderColor: '#10b981' },
  expenseActive: { backgroundColor: '#7f1d1d', borderColor: '#ef4444' },
  typeText: { color: '#fff', fontWeight: '600' },
  saveBtn: { backgroundColor: '#3b82f6', padding: 14, borderRadius: 8, alignItems: 'center' },
  saveBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  historyCard: { backgroundColor: '#1e293b', borderRadius: 16, padding: 20, marginBottom: 40, borderWidth: 1, borderColor: '#334155' },
  noTxText: { color: '#94a3b8', textAlign: 'center', fontStyle: 'italic' },
  txItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#334155' },
  txDesc: { color: '#f8fafc', fontSize: 16 },
  txAmount: { fontSize: 16, fontWeight: 'bold' },
  incAmt: { color: '#4ade80' },
  expAmt: { color: '#f87171' },
});
