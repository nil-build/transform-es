import v from "mod";
import * as ns from "mod";
import { q1x } from "mod";
import { zx as gv } from "mod";
import "mod";
export { x111 } from "mod";
export { x222 as v333 } from "mod";
export * from "mod";
export sv2 from "mod";

var sv21;
export var vxx;
export default function f() {}
export { sv21 };
export { sv21 as v };

//Array.isArray
Array.isArray(vxx);

//member-expression-literals
{
	obj["foo"] = "isValid";

	obj.const = "isKeyword";
	obj["var"] = "isKeyword";
}
//property-literals
{
	var foo = {
		// changed
		bar: function() {},
		"1": function() {},

		// not changed
		default: 1,
		[a]: 2,
		foo: 1,
	};
}
//reserved-words
{
	var abstract = 1;
	var x = abstract + 1;
}
//property-mutators
{
	var foo = {
		get bar() {
			return this._bar;
		},
		set bar(value) {
			this._bar = value;
		},
	};
}
//arrow-functions
{
	var a1 = () => {};
	var a2 = b => b;

	const double = [1, 2, 3].map(num => num * 2);
	console.log(double); // [2,4,6]

	var bob = {
		_name: "Bob",
		_friends: ["Sally", "Tom"],
		printFriends() {
			this._friends.forEach(f => console.log(this._name + " knows " + f));
		},
	};
	console.log(bob.printFriends());
}
//block-scoped-functions
{
	{
		function name(n) {
			return n;
		}
	}

	name("Steve");
}
//block - scoping
{
	{
		let a = 3;
	}

	let a = 3;
}
//classes
{
	class Test {
		constructor(name) {
			this.name = name;
		}

		logger() {
			console.log("Hello", this.name);
		}
	}
}
//computed-properties
{
	var obj = {
		["x" + foo]: "heh",
		["y" + bar]: "noo",
		foo: "foo",
		bar: "bar",
	};
}
//destructuring
{
	let { x, y } = obj;

	let [a, b, ...rest] = arr;
}
//duplicate-keys
{
	var x = { a: 5, a: 6 };
	var y = {
		get a() {},
		set a(x) {},
		a: 3,
	};
}
//for-of
{
	for (var i of foo) {
	}
}
//function-name
{
	let number = x => x;
}
//instanceof
{
	foo instanceof Bar;
}
//literals
{
	var b = 0b11; // binary integer literal
	var o = 0o7; // octal integer literal
	const u = "Hello\u{000A}\u{0009}!"; // unicode string literals, newline and tab
}
//new-target
{
	function Foo() {
		console.log(new.target);
	}

	Foo(); // => undefined
	new Foo(); // => Foo
}
//object-super
{
	let obj = {
		say() {
			return "Hello";
		},
	};

	let obj2 = {
		say() {
			return super.say() + "World!";
		},
	};
}
//parameters
{
	function test(x = "hello", { a, b }, ...args) {
		console.log(x, a, b, args);
	}
}
//shorthand-properties
{
	var o = { a, b, c };
}
//spread
{
	var za = ["a", "b", "c"];

	var zb = [...za, "foo"];

	var zc = foo(...za);
}
//sticky-regex
{
	const a = /o+/y;
}
//template-literals
{
	`foo${bar}`;
}
//typeof-symbol
{
	typeof Symbol() === "symbol";
}
//unicode-regex
{
	var string = "foo💩bar";
	var match = string.match(/foo(.)bar/u);
}
//ES2016
//exponentiation-operator
{
	let x = 10 ** 2;

	x **= 3;
}
//ES2017
//async-to-generator
{
	async function foo() {
		await bar();
	}
}
//ES2018
//async-generator-functions
{
	async function* agf() {
		await 1;
		yield 2;
	}
}
//dotall-regex
{
	/./s;
}
//object-rest-spread
{
	let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
	console.log(x); // 1
	console.log(y); // 2
	console.log(z); // { a: 3, b: 4 }
}
//optional-catch-binding
{
	try {
		throw 0;
	} catch {
		doSomethingWhichDoesntCareAboutTheValueThrown();
	}
}

//Experimental
//class-properties
{
	class Bork {
		//Property initializer syntax
		instanceProperty = "bork";
		boundFunction = () => {
			return this.instanceProperty;
		};

		//Static class properties
		static staticProperty = "babelIsCool";
		static staticFunction = function() {
			return Bork.staticProperty;
		};
	}

	let myBork = new Bork();

	//Property initializers are not on the prototype.
	console.log(myBork.__proto__.boundFunction); // > undefined

	//Bound functions are bound to the class instance.
	console.log(myBork.boundFunction.call(undefined)); // > "bork"

	//Static function exists on the class.
	console.log(Bork.staticFunction()); // > "babelIsCool"
}
//decorators
// {
//     @annotation
//     class MyClass {}

//     function annotation(target) {
//         target.annotated = true;
//     }
// }
//do-expressions
{
	let za = do {
		if (x > 10) {
			("big");
		} else {
			("small");
		}
	};
	// is equivalent to:
	let zza = x > 10 ? "big" : "small";
}
//function-bind
{
	obj::func;
	// is equivalent to:
	func.bind(obj)::obj.func;
	// is equivalent to:
	obj.func.bind(obj);

	obj::func(val);
	// is equivalent to:
	func.call(obj, val)::obj.func(val);
	// is equivalent to:
	obj.func.call(obj, val);
}
//function-sent
{
	function* generator() {
		console.log("Sent", function.sent);
		console.log("Yield", yield);
	}

	const iterator = generator();
	iterator.next(1); // Logs "Sent 1"
	iterator.next(2); // Logs "Yield 2"
}
//logical-assignment-operators
{
	a ||= b;
	obj.a.b ||= c;

	a &&= b;
	obj.a.b &&= c;
}
//nullish-coalescing-operator
{
	var foo = object.foo ?? "default";
}
//numeric-separator
{
	let budget = 1_000_000_000_000;

	// What is the value of `budget`? It's 1 trillion!
	//
	// Let's confirm:
	console.log(budget === 10 ** 12); // true
}
//optional-chaining
{
	const obj = {
		foo: {
			bar: {
				baz: 42,
			},
		},
	};

	const baz = obj?.foo?.bar?.baz; // 42

	const safe = obj?.qux?.baz; // undefined

	// Optional chaining and normal chaining can be intermixed
	obj?.foo.bar?.baz; // Only access `foo` if `obj` exists, and `baz` if
	// `bar` exists
}
//pipeline-operator
{
	const sum = nos => nos.reduce((p, c) => p + +c, 0);
	const avg = nos => sum(nos) / nos.length;
	const tail = ([_, ...tail]) => tail;
	const tailAndAverage = tail |> avg; // valid?

	function double(x) {
		return x + x;
	}
	function add(x, y) {
		return x + y;
	}

	function boundScore(min, max, score) {
		return Math.max(min, Math.min(max, score));
	}

	let person = { score: 25 };

	let newScore =
		person.score
		|> double
		|> (_ => add(7, _))
		|> (_ => boundScore(0, 100, _));

	newScore; //=> 57
}
//throw-expressions
{
	function test(param = throw new Error("required!")) {
		const test = param === true || throw new Error("Falsey!");
	}
}
//react-jsx
{
	const Hr = () => {
		return <hr className="hr" />;
	};
	var profile = (
		<div>
			<img src="avatar.png" className="profile" />
			<h3>{[user.firstName, user.lastName].join(" ")}</h3>
		</div>
	);

	<Sometag />;
}
//flow-strip-types
// {
//     function foo(one: any, two: number, three?): string {}
// }
//object-assign
{
	Object.assign(a, b);
}
//object-set-prototype-of-to-assign
{
	Object.setPrototypeOf(bar, foo);
}
//proto-to-assign
{
	var foo = { a: 1 };
	var bar = { b: 2 };
	bar.__proto__ = foo;
	bar.a; // 1
	bar.b; // 2
}
//regenerator
{
	function* a() {
		yield 1;
	}
}
